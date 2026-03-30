
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useCustomerAuth } from "@/lib/context/CustomerAuthContext";
import * as cartApi from "@/lib/api/cart";

export interface CartItem {
  id: string; // This will be the itemId from backend if synced, or a local composite id
  productId: string;
  variantId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = 'tc_guest_cart';

const loadGuestCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(GUEST_CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveGuestCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  } catch { /* storage full — silently ignore */ }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading: isAuthLoading } = useCustomerAuth();
  const [items, setItems] = useState<CartItem[]>(() => loadGuestCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Map backend cart to our local state
  const syncWithBackend = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const cart = await cartApi.getCart();
      const mappedItems: CartItem[] = cart.items.map(item => ({
        id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        name: item.product.name + (item.variant.name !== 'Default' ? ` - ${item.variant.name}` : ''),
        price: parseFloat(item.variant.price),
        image: (item.product.images && item.product.images[0]) || "/images/placeholder-product.png",
        quantity: item.quantity
      }));
      setItems(mappedItems);
    } catch (err) {
      console.error("Failed to sync cart with backend", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.removeItem(GUEST_CART_KEY);
      syncWithBackend();
    }
  }, [isAuthenticated, syncWithBackend]);

  // Persist guest cart to localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      saveGuestCart(items);
    }
  }, [items, isAuthenticated]);

  const addItem = async (newItem: Omit<CartItem, 'id'>) => {
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        await cartApi.addToCart({
          productId: newItem.productId,
          variantId: newItem.variantId,
          quantity: newItem.quantity
        });
        await syncWithBackend();
      } catch (err) {
        console.error("Failed to add to backend cart", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === newItem.productId && i.variantId === newItem.variantId);
        if (existing) {
          return prev.map((i) =>
            (i.productId === newItem.productId && i.variantId === newItem.variantId) 
              ? { ...i, quantity: i.quantity + newItem.quantity } 
              : i
          );
        }
        return [...prev, { ...newItem, id: `${newItem.productId}-${newItem.variantId}` }];
      });
    }
    setIsCartOpen(true);
  };

  const removeItem = async (id: string) => {
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        await cartApi.removeCartItem(id);
        await syncWithBackend();
      } catch (err) {
        console.error("Failed to remove from backend cart", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return removeItem(id);
    
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        await cartApi.updateCartItem(id, quantity);
        await syncWithBackend();
      } catch (err) {
        console.error("Failed to update backend cart", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        await cartApi.clearCart();
        setItems([]);
      } catch (err) {
        console.error("Failed to clear backend cart", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems([]);
    }
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
        isLoading: isLoading || isAuthLoading,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

