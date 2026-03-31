import apiClient from "./client";

// ─── Admin Password Reset ───────────────────────────────────

export const adminForgotPassword = async (email: string) => {
  const response = await apiClient.post("/auth/forgot-password", { email });
  return response.data;
};

export const adminResetPassword = async (token: string, password: string) => {
  const response = await apiClient.post("/auth/reset-password", { token, password });
  return response.data;
};

// ─── Customer Password Reset ────────────────────────────────

export const customerForgotPassword = async (email: string) => {
  const response = await apiClient.post("/shop/auth/forgot-password", { email });
  return response.data;
};

export const customerResetPassword = async (token: string, password: string) => {
  const response = await apiClient.post("/shop/auth/reset-password", { token, password });
  return response.data;
};

// ─── Password Validation ────────────────────────────────────

export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

export const validatePassword = (password: string): PasswordValidation => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
