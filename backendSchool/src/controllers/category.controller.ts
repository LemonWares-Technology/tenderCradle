import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { AppError } from '../utils/AppError';
import { AuthRequest } from '../middlewares/auth.middleware';
import { handlePrismaError } from '../utils/prismaErrorHandler';
import { config } from '../config';

/**
 * Category Controller
 * Handles CRUD for product categories (hierarchical).
 */

// GET /api/shop/categories (Public)
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true, parentId: null }, // Top-level categories
      include: {
        children: {
          where: { isActive: true },
          include: {
            children: { where: { isActive: true } }, // 2 levels deep
          },
          orderBy: { order: 'asc' },
        },
        _count: { select: { products: true } },
      },
      orderBy: { order: 'asc' },
    });

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// GET /api/shop/categories/:slug (Public)
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug as string;

    const category = await prisma.category.findUnique({
      where: { slug: slug as string },
      include: {
        children: { where: { isActive: true }, orderBy: { order: 'asc' } },
        products: {
          where: { isActive: true },
          include: {
            variants: {
              where: { isActive: true },
              select: { id: true, name: true, price: true, stock: true, reservedStock: true },
              orderBy: { price: 'asc' },
            },
          },
          take: 20,
        },
      },
    });

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// POST /api/admin/categories (Admin)
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await prisma.category.create({
      data: req.body,
    });

    res.status(201).json({ success: true, data: category });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return next(new AppError('A category with this slug already exists.', 409));
    }
    next(error);
  }
};

// PUT /api/admin/categories/:id (Admin)
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await prisma.category.update({
      where: { id: req.params.id as string },
      data: req.body,
    });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    handlePrismaError(error, 'Category');
  }
};

// DELETE /api/admin/categories/:id (Admin)
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if category has products
    const productCount = await prisma.product.count({
      where: { categoryId: req.params.id as string },
    });

    if (productCount > 0) {
      throw new AppError(
        `Cannot delete category. It has ${productCount} product(s). Reassign them first.`,
        400
      );
    }

    await prisma.category.delete({ where: { id: req.params.id as string } });

    res.status(200).json({ success: true, message: 'Category deleted.' });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    handlePrismaError(error, 'Category');
  }
};
