import { Router } from 'express';
import { protect, adminOnly, customerProtect, customerOrAdmin } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validateRequest';
import { authRateLimit } from '../middlewares/rateLimit.middleware';

// Existing Controllers
import * as auth from '../controllers/auth.controller';
import * as project from '../controllers/project.controller';
import * as blog from '../controllers/blog.controller';
import * as team from '../controllers/team.controller';
import * as lead from '../controllers/lead.controller';
import * as newsletter from '../controllers/newsletter.controller';
import * as execSummary from '../controllers/executive-summary.controller';
import * as stats from '../controllers/stats.controller';

// E-Commerce Controllers
import * as customerAuth from '../controllers/customer-auth.controller';
import * as productCtrl from '../controllers/product.controller';
import * as category from '../controllers/category.controller';
import * as cart from '../controllers/cart.controller';
import * as order from '../controllers/order.controller';
import * as adminOrder from '../controllers/admin-order.controller';
import * as payment from '../controllers/payment.controller';
import * as review from '../controllers/review.controller';

// Validation Schemas
import {
  loginSchema,
  createProjectSchema, createBlogSchema, createTeamSchema,
  createLeadSchema, subscribeSchema, createExecSummarySchema,
  // E-Commerce Schemas
  customerRegisterSchema, customerLoginSchema, updateCustomerProfileSchema,
  createCategorySchema, updateCategorySchema,
  createProductSchema as createProductSchemaVal, updateProductSchema, updateVariantStockSchema,
  addToCartSchema, updateCartItemSchema,
  checkoutSchema, cancelOrderSchema, updateOrderStatusSchema,
  initializePaymentSchema, verifyPaymentSchema,
  createReviewSchema, updateReviewSchema,
} from '../schemas';

const router = Router();

// ═══════════════════════════════════════════════════════════
// EXISTING ROUTES (unchanged)
// ═══════════════════════════════════════════════════════════

// ─── Auth ────────────────────────────────────────────────
// Registration is disabled — admin is seeded from .env on startup.
router.post('/auth/login', authRateLimit, validateRequest(loginSchema), auth.login);
router.get('/auth/me', protect, auth.getMe);

// ─── Projects ────────────────────────────────────────────
router.get('/projects', project.getAll);                                                        // Public
router.get('/projects/:id', project.getOne);                                                    // Public
router.post('/projects', protect, adminOnly, validateRequest(createProjectSchema), project.create);
router.put('/projects/:id', protect, adminOnly, project.update);
router.delete('/projects/:id', protect, adminOnly, project.remove);

// ─── Blogs ───────────────────────────────────────────────
router.get('/blogs', blog.getAll);                                                              // Public
router.get('/blogs/:id', blog.getOne);                                                          // Public
router.post('/blogs', protect, adminOnly, validateRequest(createBlogSchema), blog.create);
router.put('/blogs/:id', protect, adminOnly, blog.update);
router.delete('/blogs/:id', protect, adminOnly, blog.remove);

// ─── Team ────────────────────────────────────────────────
router.get('/team', team.getAll);                                                               // Public
router.get('/team/:id', team.getOne);                                                           // Public
router.post('/team', protect, adminOnly, validateRequest(createTeamSchema), team.create);
router.put('/team/:id', protect, adminOnly, team.update);
router.delete('/team/:id', protect, adminOnly, team.remove);

// ─── Leads (Contact Form) ───────────────────────────────
router.post('/leads', validateRequest(createLeadSchema), lead.create);                          // Public
router.get('/leads', protect, adminOnly, lead.getAll);
router.delete('/leads/:id', protect, adminOnly, lead.remove);

// ─── Newsletter ─────────────────────────────────────────
router.post('/newsletters', validateRequest(subscribeSchema), newsletter.subscribe);            // Public
router.get('/newsletters', protect, adminOnly, newsletter.getAll);
router.delete('/newsletters/:id', protect, adminOnly, newsletter.remove);

// ─── Executive Summary ──────────────────────────────────
router.get('/executive-summary', execSummary.getAll);                                           // Public
router.post('/executive-summary', protect, adminOnly, validateRequest(createExecSummarySchema), execSummary.create);
router.put('/executive-summary/:id', protect, adminOnly, execSummary.update);
router.delete('/executive-summary/:id', protect, adminOnly, execSummary.remove);

// ─── Dashboard Stats ────────────────────────────────────
router.get('/stats', protect, adminOnly, stats.getDashboardStats);

// ═══════════════════════════════════════════════════════════
// E-COMMERCE ROUTES
// ═══════════════════════════════════════════════════════════

// ─── Customer Auth ───────────────────────────────────────
router.post('/shop/auth/register', authRateLimit, validateRequest(customerRegisterSchema), customerAuth.register);
router.post('/shop/auth/login', authRateLimit, validateRequest(customerLoginSchema), customerAuth.login);
router.get('/shop/auth/me', customerProtect, customerAuth.getProfile);
router.put('/shop/auth/profile', customerProtect, validateRequest(updateCustomerProfileSchema), customerAuth.updateProfile);

// ─── Categories (Public) ────────────────────────────────
router.get('/shop/categories', category.getAll);
router.get('/shop/categories/:slug', category.getOne);

// ─── Products (Public) ──────────────────────────────────
router.get('/shop/products', productCtrl.getAll);
router.get('/shop/products/:slug', productCtrl.getOne);

// ─── Product Reviews (Public + Customer) ────────────────
router.get('/shop/products/:productId/reviews', review.getProductReviews);
router.post('/shop/reviews', customerProtect, validateRequest(createReviewSchema), review.createReview);
router.put('/shop/reviews/:id', customerProtect, validateRequest(updateReviewSchema), review.updateReview);
router.delete('/shop/reviews/:id', customerProtect, review.deleteReview);

// ─── Cart (Customer) ────────────────────────────────────
router.get('/shop/cart', customerProtect, cart.getCart);
router.post('/shop/cart/items', customerProtect, validateRequest(addToCartSchema), cart.addItem);
router.put('/shop/cart/items/:itemId', customerProtect, validateRequest(updateCartItemSchema), cart.updateItem);
router.delete('/shop/cart/items/:itemId', customerProtect, cart.removeItem);
router.delete('/shop/cart', customerProtect, cart.clearCart);

// ─── Orders (Customer) ──────────────────────────────────
router.post('/shop/orders/checkout', customerProtect, validateRequest(checkoutSchema), order.checkout);
router.get('/shop/orders', customerProtect, order.getMyOrders);
router.get('/shop/orders/:id', customerProtect, order.getMyOrder);
router.post('/shop/orders/:id/cancel', customerProtect, validateRequest(cancelOrderSchema), order.cancelOrder);

// ─── Payments (Customer) ────────────────────────────────
router.post('/shop/payments/initialize', customerProtect, validateRequest(initializePaymentSchema), payment.initializePayment);
router.get('/shop/payments/verify/:reference', customerProtect, payment.verifyPayment);

// ─── Paystack Webhook (Public — verified via HMAC) ──────
router.post('/webhooks/paystack', payment.handlePaystackWebhook);

// ═══════════════════════════════════════════════════════════
// ADMIN E-COMMERCE ROUTES
// ═══════════════════════════════════════════════════════════

// ─── Admin: Categories ──────────────────────────────────
router.post('/admin/categories', protect, adminOnly, validateRequest(createCategorySchema), category.create);
router.put('/admin/categories/:id', protect, adminOnly, validateRequest(updateCategorySchema), category.update);
router.delete('/admin/categories/:id', protect, adminOnly, category.remove);

// ─── Admin: Products ────────────────────────────────────
router.get('/admin/products', protect, adminOnly, productCtrl.adminGetAll);
router.post('/admin/products', protect, adminOnly, validateRequest(createProductSchemaVal), productCtrl.create);
router.put('/admin/products/:id', protect, adminOnly, validateRequest(updateProductSchema), productCtrl.update);
router.delete('/admin/products/:id', protect, adminOnly, productCtrl.remove);
router.put('/admin/products/:productId/variants/:variantId/stock', protect, adminOnly, validateRequest(updateVariantStockSchema), productCtrl.updateVariantStock);

// ─── Admin: Orders ──────────────────────────────────────
router.get('/admin/orders', protect, adminOnly, adminOrder.getAllOrders);
router.get('/admin/orders/:id', protect, adminOnly, adminOrder.getOrder);
router.put('/admin/orders/:id/status', protect, adminOnly, validateRequest(updateOrderStatusSchema), adminOrder.updateOrderStatus);

// ─── Admin: E-Commerce Stats ────────────────────────────
router.get('/admin/ecommerce-stats', protect, adminOnly, adminOrder.getEcommerceStats);

export default router;
