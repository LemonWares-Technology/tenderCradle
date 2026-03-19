import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { AppError } from '../utils/AppError';
import { AuthRequest } from '../middlewares/auth.middleware';
import { handlePrismaError } from '../utils/prismaErrorHandler';
import { config } from '../config';
import { Prisma } from '../generated/prisma/client';
import * as stockService from '../services/stock.service';

/**
 * Product Controller
 * Public: browsing, search, filtering
 * Admin: full CRUD, stock management
 */

// GET /api/shop/products (Public — paginated, filterable)
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = '1',
      pageSize = String(config.defaultPageSize),
      category,
      minPrice,
      maxPrice,
      tag,
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const pageSizeNum = Math.min(
      config.maxPageSize,
      Math.max(1, parseInt(pageSize as string, 10) || config.defaultPageSize)
    );
    const skip = (pageNum - 1) * pageSizeNum;

    // Build where clause
    const where: Prisma.ProductWhereInput = { isActive: true };

    if (category) {
      where.category = { slug: category as string };
    }

    if (tag) {
      where.tags = { has: tag as string };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { tags: { has: search as string } },
      ];
    }

    // Price filter (needs variant-level filtering)
    if (minPrice || maxPrice) {
      where.variants = {
        some: {
          isActive: true,
          ...(minPrice && { price: { gte: parseFloat(minPrice as string) } }),
          ...(maxPrice && { price: { lte: parseFloat(maxPrice as string) } }),
        },
      };
    }

    // Sort mapping
    const validSortFields = ['createdAt', 'name', 'updatedAt'];
    const sortField = validSortFields.includes(sortBy as string) ? (sortBy as string) : 'createdAt';
    const order = sortOrder === 'asc' ? 'asc' : 'desc';

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          variants: {
            where: { isActive: true },
            select: {
              id: true, name: true, sku: true, price: true,
              compareAtPrice: true, stock: true, reservedStock: true,
              attributes: true,
            },
            orderBy: { price: 'asc' },
          },
          _count: { select: { reviews: true } },
        },
        orderBy: { [sortField]: order },
        skip,
        take: pageSizeNum,
      }),
      prisma.product.count({ where }),
    ]);

    // Add computed fields
    const enrichedProducts = products.map((product) => {
      const lowestPrice = product.variants.length > 0
        ? Math.min(...product.variants.map((v) => Number(v.price)))
        : null;
      const totalStock = product.variants.reduce(
        (sum, v) => sum + (v.stock - v.reservedStock), 0
      );

      return {
        ...product,
        lowestPrice,
        totalStock,
        inStock: totalStock > 0,
      };
    });

    res.status(200).json({
      success: true,
      data: enrichedProducts,
      pagination: {
        page: pageNum,
        pageSize: pageSizeNum,
        total,
        totalPages: Math.ceil(total / pageSizeNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/shop/products/:slug (Public)
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug: slug as string }, { id: slug as string }],
        isActive: true,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
        reviews: {
          where: { isApproved: true },
          include: {
            customer: { select: { firstName: true, lastName: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: { select: { reviews: true } },
      },
    });

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    // Calculate average rating
    const avgRating = product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

    res.status(200).json({
      success: true,
      data: {
        ...product,
        averageRating: Math.round(avgRating * 10) / 10,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/admin/products (Admin)
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { variants, ...productData } = req.body;

    const product = await prisma.product.create({
      data: {
        ...productData,
        variants: {
          createMany: { data: variants },
        },
      },
      include: { variants: true },
    });

    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      const field = error.meta?.target?.[0] || 'field';
      return next(new AppError(`A product with this ${field} already exists.`, 409));
    }
    next(error);
  }
};

// PUT /api/admin/products/:id (Admin)
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id as string },
      data: req.body,
      include: { variants: true },
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    handlePrismaError(error, 'Product');
  }
};

// DELETE /api/admin/products/:id (Admin)
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check for active orders
    const activeOrderItems = await prisma.orderItem.count({
      where: {
        productId: req.params.id as string,
        order: { status: { in: ['PENDING', 'CONFIRMED', 'PROCESSING'] } },
      },
    });

    if (activeOrderItems > 0) {
      throw new AppError(
        'Cannot delete product with active orders. Deactivate it instead.',
        400
      );
    }

    await prisma.product.delete({ where: { id: req.params.id as string } });

    res.status(200).json({ success: true, message: 'Product deleted.' });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    handlePrismaError(error, 'Product');
  }
};

// PUT /api/admin/products/:productId/variants/:variantId/stock (Admin)
export const updateVariantStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const variantId = req.params.variantId as string;
    const { stock, delta } = req.body;

    if (stock !== undefined) {
      await stockService.setStock(variantId, stock);
    } else if (delta !== undefined) {
      await stockService.adjustStock(variantId, delta);
    }

    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
      select: {
        id: true, name: true, sku: true, stock: true,
        reservedStock: true, lowStockThreshold: true,
      },
    });

    const available = variant ? variant.stock - variant.reservedStock : 0;
    const isLow = variant ? available <= variant.lowStockThreshold : false;

    res.status(200).json({
      success: true,
      data: { ...variant, availableStock: available, isLowStock: isLow },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/products (Admin — includes inactive)
export const adminGetAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = '1',
      pageSize = String(config.defaultPageSize),
      search,
      category,
      active,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const pageSizeNum = Math.min(config.maxPageSize, parseInt(pageSize as string, 10) || config.defaultPageSize);
    const skip = (pageNum - 1) * pageSizeNum;

    const where: Prisma.ProductWhereInput = {};

    if (active !== undefined) {
      where.isActive = active === 'true';
    }
    if (category) {
      where.categoryId = category as string;
    }
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { sku: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true } },
          variants: {
            select: {
              id: true, name: true, sku: true, price: true,
              stock: true, reservedStock: true, isActive: true,
            },
          },
          _count: { select: { reviews: true, orderItems: true } },
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: pageSizeNum,
      }),
      prisma.product.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: pageNum,
        pageSize: pageSizeNum,
        total,
        totalPages: Math.ceil(total / pageSizeNum),
      },
    });
  } catch (error) {
    next(error);
  }
};
