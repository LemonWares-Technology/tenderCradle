import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as cartService from '../services/cart.service';

/**
 * Cart Controller
 * All routes require customer authentication.
 */

// GET /api/shop/cart
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const cart = await cartService.getCartWithTotals(customerId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

// POST /api/shop/cart/items
export const addItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const { productId, variantId, quantity } = req.body;
    const cart = await cartService.addItem(customerId, productId, variantId, quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

// PUT /api/shop/cart/items/:itemId
export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const itemId = req.params.itemId as string;
    const { quantity } = req.body;
    const cart = await cartService.updateItemQuantity(customerId, itemId, quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/shop/cart/items/:itemId
export const removeItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const itemId = req.params.itemId as string;
    const cart = await cartService.removeItem(customerId, itemId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/shop/cart
export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const cart = await cartService.clearCart(customerId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};
