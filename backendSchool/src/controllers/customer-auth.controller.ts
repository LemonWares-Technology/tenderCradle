import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { config } from '../config';
import { AppError } from '../utils/AppError';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as emailService from '../services/email.service';

/**
 * Customer Authentication Controller
 * Handles registration, login, profile management for e-commerce customers.
 */

const signCustomerToken = (customer: { id: string; email: string }) => {
  return jwt.sign(
    { id: customer.id, email: customer.email, role: 'CUSTOMER' },
    config.jwtSecret,
    { expiresIn: config.customerJwtExpiresIn as unknown as jwt.SignOptions['expiresIn'] }
  );
};

// POST /api/shop/auth/register
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Check if customer already exists
    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
      throw new AppError('An account with this email already exists.', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const customer = await prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
      },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        phone: true, createdAt: true,
      },
    });

    const token = signCustomerToken(customer);

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail(customer.email, customer.firstName);
    } catch (err) {
      // Non-blocking
    }

    res.status(201).json({
      success: true,
      token,
      customer,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/shop/auth/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      throw new AppError('Invalid email or password.', 401);
    }

    if (!customer.isActive) {
      throw new AppError('Your account has been deactivated. Please contact support.', 403);
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password.', 401);
    }

    const token = signCustomerToken(customer);

    res.status(200).json({
      success: true,
      token,
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/shop/auth/me
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user?.id;

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        phone: true, addresses: true, emailVerified: true,
        createdAt: true, updatedAt: true,
      },
    });

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

// PUT /api/shop/auth/profile
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user?.id;
    const { firstName, lastName, phone, addresses } = req.body;

    const customer = await prisma.customer.update({
      where: { id: customerId },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone !== undefined && { phone }),
        ...(addresses !== undefined && { addresses }),
      },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        phone: true, addresses: true,
      },
    });

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};
