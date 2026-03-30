import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Customer, customerLogin, getCustomerProfile, customerLogout, isCustomerAuthenticated, CustomerLoginData, CustomerRegisterData, customerRegister } from '../api/customer-auth';

// ─── Types ──────────────────────────────────────────────────

interface CustomerAuthContextType {
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
  login: (data: CustomerLoginData) => Promise<void>;
  register: (data: CustomerRegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshProfile: () => Promise<void>;
}

// ─── Context ────────────────────────────────────────────────

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

// ─── Provider ───────────────────────────────────────────────

export const CustomerAuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const refreshProfile = useCallback(async () => {
    if (isCustomerAuthenticated()) {
      try {
        const profile = await getCustomerProfile();
        setCustomer(profile);
      } catch (err) {
        setCustomer(null);
      }
    } else {
      setCustomer(null);
    }
  }, []);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      await refreshProfile();
      setIsLoading(false);
    };
    checkAuth();
  }, [refreshProfile]);

  const login = useCallback(async (data: CustomerLoginData) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const response = await customerLogin(data);
      setCustomer(response.customer);
    } catch (err: any) {
      if (err.errors) {
        const newFieldErrors: Record<string, string> = {};
        err.errors.forEach((e: any) => {
          const path = e.path.startsWith('body.') ? e.path.replace('body.', '') : e.path;
          if (newFieldErrors[path]) {
            newFieldErrors[path] = `${newFieldErrors[path]} ${e.message}`;
          } else {
            newFieldErrors[path] = e.message;
          }
        });
        setFieldErrors(newFieldErrors);
        setError('Please correct the highlighted errors.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: CustomerRegisterData) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const response = await customerRegister(data);
      setCustomer(response.customer);
    } catch (err: any) {
      if (err.errors) {
        const newFieldErrors: Record<string, string> = {};
        err.errors.forEach((e: any) => {
          const path = e.path.startsWith('body.') ? e.path.replace('body.', '') : e.path;
          newFieldErrors[path] = e.message;
        });
        setFieldErrors(newFieldErrors);
        setError('Please correct the highlighted errors.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setCustomer(null);
    customerLogout();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setFieldErrors({});
  }, []);

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        isAuthenticated: !!customer,
        isLoading,
        error,
        fieldErrors,
        login,
        register,
        logout,
        clearError,
        refreshProfile,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};

// ─── Hook ───────────────────────────────────────────────────

export const useCustomerAuth = (): CustomerAuthContextType => {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
};
