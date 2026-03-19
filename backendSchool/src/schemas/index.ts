import { z } from 'zod';

// ─── Auth ────────────────────────────────────────────────
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

// ─── Project ─────────────────────────────────────────────
export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Project name is required'),
    location: z.string().min(1, 'Location is required'),
    description: z.string().min(1, 'Description is required'),
    status: z.string().min(1, 'Status is required'),
    value: z.string().optional(),
    image: z.string().min(1, 'Image is required'),
    gallery: z.array(z.string()).optional(),
  }),
});

// ─── Blog ────────────────────────────────────────────────
export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.string().min(1, 'Author is required'),
    role: z.string().min(1, 'Role is required'),
    image: z.string().min(1, 'Image is required'),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().min(1, 'Excerpt is required'),
    content: z.string().min(1, 'Content is required'),
  }),
});

// ─── Team ────────────────────────────────────────────────
export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    bio: z.string().min(1, 'Bio is required'),
    order: z.number().optional(),
  }),
});

// ─── Lead ────────────────────────────────────────────────
export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
  }),
});

// ─── Newsletter ──────────────────────────────────────────
export const subscribeSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

// ─── Executive Summary ──────────────────────────────────
export const createExecSummarySchema = z.object({
  body: z.object({
    project: z.string().min(1, 'Project is required'),
    loc: z.string().min(1, 'Location is required'),
    status: z.string().min(1, 'Status is required'),
    val: z.string().optional(),
    order: z.number().optional(),
  }),
});

// ═══════════════════════════════════════════════════════════
// E-COMMERCE SCHEMAS
// ═══════════════════════════════════════════════════════════

// ─── Address (shared) ────────────────────────────────────
const addressSchema = z.object({
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().optional(),
  country: z.string().min(1, 'Country is required').default('Nigeria'),
});

// ─── Customer Auth ───────────────────────────────────────
export const customerRegisterSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    firstName: z.string().min(1, 'First name is required').max(50),
    lastName: z.string().min(1, 'Last name is required').max(50),
    phone: z.string().optional(),
  }),
});

export const customerLoginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const updateCustomerProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(1).max(50).optional(),
    phone: z.string().optional(),
    addresses: z.array(z.object({
      label: z.string().min(1, 'Address label is required'),
      line1: z.string().min(1),
      line2: z.string().optional(),
      city: z.string().min(1),
      state: z.string().min(1),
      zip: z.string().optional(),
      country: z.string().min(1).default('Nigeria'),
      isDefault: z.boolean().optional(),
    })).optional(),
  }),
});

// ─── Category ────────────────────────────────────────────
export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required').max(100),
    slug: z.string().min(1, 'Slug is required').max(100)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
    description: z.string().optional(),
    image: z.string().optional(),
    parentId: z.string().uuid().optional().nullable(),
    isActive: z.boolean().optional(),
    order: z.number().int().optional(),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    slug: z.string().min(1).max(100)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only')
      .optional(),
    description: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    parentId: z.string().uuid().optional().nullable(),
    isActive: z.boolean().optional(),
    order: z.number().int().optional(),
  }),
});

// ─── Product ─────────────────────────────────────────────
const variantSchema = z.object({
  sku: z.string().min(1, 'Variant SKU is required'),
  name: z.string().default('Default'),
  price: z.number().positive('Price must be positive'),
  compareAtPrice: z.number().positive().optional().nullable(),
  stock: z.number().int().min(0, 'Stock cannot be negative').default(0),
  lowStockThreshold: z.number().int().min(0).default(5),
  attributes: z.record(z.string(), z.string()).optional(),
  isActive: z.boolean().optional(),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name is required').max(200),
    slug: z.string().min(1, 'Slug is required').max(200)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
    sku: z.string().min(1, 'SKU is required').max(50),
    description: z.string().min(1, 'Description is required'),
    shortDescription: z.string().optional(),
    images: z.array(z.string()).optional(),
    categoryId: z.string().uuid().optional().nullable(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    attributes: z.record(z.string(), z.string()).optional(),
    variants: z.array(variantSchema).min(1, 'At least one variant is required'),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(200).optional(),
    slug: z.string().min(1).max(200)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    sku: z.string().min(1).max(50).optional(),
    description: z.string().min(1).optional(),
    shortDescription: z.string().optional().nullable(),
    images: z.array(z.string()).optional(),
    categoryId: z.string().uuid().optional().nullable(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    attributes: z.record(z.string(), z.string()).optional(),
  }),
});

export const updateVariantStockSchema = z.object({
  body: z.object({
    stock: z.number().int().min(0).optional(),
    delta: z.number().int().optional(),
  }).refine(
    (data) => data.stock !== undefined || data.delta !== undefined,
    { message: 'Either stock (absolute) or delta (relative adjustment) is required' }
  ),
});

// ─── Cart ────────────────────────────────────────────────
export const addToCartSchema = z.object({
  body: z.object({
    productId: z.string().uuid('Invalid product ID'),
    variantId: z.string().uuid('Invalid variant ID'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1').default(1),
  }),
});

export const updateCartItemSchema = z.object({
  body: z.object({
    quantity: z.number().int().min(0, 'Quantity cannot be negative'),
  }),
});

// ─── Order / Checkout ────────────────────────────────────
export const checkoutSchema = z.object({
  body: z.object({
    shippingAddress: addressSchema,
    billingAddress: addressSchema.optional(),
    notes: z.string().max(500).optional(),
    idempotencyKey: z.string().optional(),
  }),
});

export const cancelOrderSchema = z.object({
  body: z.object({
    reason: z.string().max(500).optional(),
  }),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']),
  }),
});

// ─── Payment ─────────────────────────────────────────────
export const initializePaymentSchema = z.object({
  body: z.object({
    orderId: z.string().uuid('Invalid order ID'),
    callbackUrl: z.string().url().optional(),
  }),
});

export const verifyPaymentSchema = z.object({
  params: z.object({
    reference: z.string().min(1, 'Payment reference is required'),
  }),
});

// ─── Review ──────────────────────────────────────────────
export const createReviewSchema = z.object({
  body: z.object({
    productId: z.string().uuid('Invalid product ID'),
    rating: z.number().int().min(1, 'Rating must be 1-5').max(5, 'Rating must be 1-5'),
    title: z.string().max(200).optional(),
    comment: z.string().max(2000).optional(),
  }),
});

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5).optional(),
    title: z.string().max(200).optional().nullable(),
    comment: z.string().max(2000).optional().nullable(),
  }),
});

// ─── Query Params (shared) ───────────────────────────────
export const paginationSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    pageSize: z.string().regex(/^\d+$/).transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});
