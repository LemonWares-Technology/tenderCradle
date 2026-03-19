import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { AppError } from '../utils/AppError';
import { AuthRequest } from '../middlewares/auth.middleware';
import { handlePrismaError } from '../utils/prismaErrorHandler';

/**
 * Review Controller
 * Handles customer product reviews with purchase verification.
 */

// GET /api/shop/products/:productId/reviews (Public)
export const getProductReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId as string;
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
    const skip = (page - 1) * pageSize;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId, isApproved: true },
        include: {
          customer: { select: { firstName: true, lastName: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.review.count({ where: { productId, isApproved: true } }),
    ]);

    // Calculate stats
    const stats = await prisma.review.aggregate({
      where: { productId, isApproved: true },
      _avg: { rating: true },
      _count: { rating: true },
    });

    const avgRating = stats._avg?.rating ?? 0;
    const totalReviews = stats._count?.rating ?? 0;

    res.status(200).json({
      success: true,
      data: reviews,
      stats: {
        averageRating: Math.round(avgRating * 10) / 10,
        totalReviews,
      },
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/shop/reviews (Customer)
export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const { productId, rating, title, comment } = req.body;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, isActive: true },
    });

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    // Check if already reviewed
    const existingReview = await prisma.review.findUnique({
      where: { customerId_productId: { customerId, productId } },
    });

    if (existingReview) {
      throw new AppError('You have already reviewed this product.', 409);
    }

    // Check if customer has purchased this product (verified review)
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          customerId,
          status: { in: ['DELIVERED', 'CONFIRMED', 'SHIPPED'] },
        },
      },
    });

    const review = await prisma.review.create({
      data: {
        customerId,
        productId,
        rating,
        title,
        comment,
        isVerified: !!hasPurchased,
      },
      include: {
        customer: { select: { firstName: true, lastName: true } },
      },
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

// PUT /api/shop/reviews/:id (Customer — own review only)
export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const id = req.params.id as string;
    const { rating, title, comment } = req.body;

    const review = await prisma.review.findUnique({ where: { id: id } });

    if (!review) {
      throw new AppError('Review not found.', 404);
    }

    if (review.customerId !== customerId) {
      throw new AppError('Access denied. You can only edit your own reviews.', 403);
    }

    const updated = await prisma.review.update({
      where: { id: id },
      data: {
        ...(rating !== undefined && { rating }),
        ...(title !== undefined && { title }),
        ...(comment !== undefined && { comment }),
      },
      include: {
        customer: { select: { firstName: true, lastName: true } },
      },
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

// DELETE /api/shop/reviews/:id (Customer — own review only)
export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as AuthRequest).user!.id;
    const id = req.params.id as string;

    const review = await prisma.review.findUnique({ where: { id: id } });

    if (!review) {
      throw new AppError('Review not found.', 404);
    }

    if (review.customerId !== customerId) {
      throw new AppError('Access denied. You can only delete your own reviews.', 403);
    }

    await prisma.review.delete({ where: { id: id } });

    res.status(200).json({ success: true, message: 'Review deleted.' });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};
