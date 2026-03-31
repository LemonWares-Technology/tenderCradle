# Password Reset API Documentation

## Overview
Complete forgot password and reset password flow for both Admin users and Customers.

## Security Features
- Tokens are hashed before storage (SHA-256)
- Tokens expire after 1 hour
- Email doesn't reveal if account exists (prevents user enumeration)
- Strong password requirements (8+ chars, uppercase, number, special char)
- Rate limiting on all endpoints (10 requests per 15 minutes)

---

## Admin Password Reset

### 1. Request Password Reset (Admin)
**POST** `/api/auth/forgot-password`

Request a password reset link for admin account.

**Rate Limit:** 10 requests per 15 minutes per IP

**Request Body:**
```json
{
  "email": "admin@tendercradle.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "If an account with that email exists, a password reset link has been sent."
}
```

**Note:** Always returns success even if email doesn't exist (security best practice to prevent user enumeration).

**Side Effects:**
- Generates secure random token
- Stores hashed token in database with 1-hour expiry
- Sends password reset email to admin email address
- Email contains link: `https://tendercradle.com/admin/reset-password?token={token}`

---

### 2. Reset Password (Admin)
**POST** `/api/auth/reset-password`

Reset admin password using the token from email.

**Rate Limit:** 10 requests per 15 minutes per IP

**Request Body:**
```json
{
  "token": "abc123def456...",
  "password": "NewSecure@Pass123"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password has been reset successfully."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid or expired reset token."
}
```

**Side Effects:**
- Hashes and updates password
- Clears reset token from database
- Token becomes invalid after use

---

## Customer Password Reset

### 3. Request Password Reset (Customer)
**POST** `/api/shop/auth/forgot-password`

Request a password reset link for customer account.

**Rate Limit:** 10 requests per 15 minutes per IP

**Request Body:**
```json
{
  "email": "customer@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "If an account with that email exists, a password reset link has been sent."
}
```

**Note:** Always returns success even if email doesn't exist (security best practice).

**Side Effects:**
- Generates secure random token
- Stores hashed token in database with 1-hour expiry
- Sends password reset email to customer email address
- Email contains link: `https://tendercradle.com/reset-password?token={token}`

---

### 4. Reset Password (Customer)
**POST** `/api/shop/auth/reset-password`

Reset customer password using the token from email.

**Rate Limit:** 10 requests per 15 minutes per IP

**Request Body:**
```json
{
  "token": "abc123def456...",
  "password": "NewSecure@Pass123"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password has been reset successfully."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid or expired reset token."
}
```

**Side Effects:**
- Hashes and updates password
- Clears reset token from database
- Token becomes invalid after use

---

## Database Schema Changes

### User Model (Admin)
```prisma
model User {
  id                   String    @id @default(uuid())
  name                 String
  email                String    @unique
  password             String
  role                 String    @default("ADMIN")
  resetPasswordToken   String?   // Hashed token
  resetPasswordExpires DateTime? // Token expiry time
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt
}
```

### Customer Model
```prisma
model Customer {
  id                   String    @id @default(uuid())
  email                String    @unique
  password             String
  firstName            String
  lastName             String
  phone                String?
  addresses            Json      @default("[]")
  emailVerified        Boolean   @default(false)
  isActive             Boolean   @default(true)
  resetPasswordToken   String?   // Hashed token
  resetPasswordExpires DateTime? // Token expiry time
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt
  cart                 Cart?
  orders               Order[]
  reviews              Review[]
}
```

---

## Email Template

**Subject:** "Password Reset Request - Tender Cradle"

**Content:**
```
Hello,

We received a request to reset your password. Click the button below to create a new password:

[Reset Password Button]

Or copy and paste this link into your browser:
{resetUrl}

This link will expire in 1 hour.

If you didn't request this, please ignore this email. Your password will remain unchanged.

Best regards,
Tender Cradle Team
```

---

## Frontend Integration

### Admin Flow

1. **Forgot Password Page** (`/admin/forgot-password`)
```typescript
const handleForgotPassword = async (email: string) => {
  const response = await fetch('https://api.tendercradle.com/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  
  const data = await response.json();
  // Show success message
  alert(data.message);
};
```

2. **Reset Password Page** (`/admin/reset-password?token={token}`)
```typescript
const handleResetPassword = async (token: string, password: string) => {
  const response = await fetch('https://api.tendercradle.com/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Redirect to login
    window.location.href = '/admin/login';
  } else {
    alert(data.message);
  }
};
```

### Customer Flow

1. **Forgot Password Page** (`/forgot-password`)
```typescript
const handleForgotPassword = async (email: string) => {
  const response = await fetch('https://api.tendercradle.com/api/shop/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  
  const data = await response.json();
  // Show success message
  alert(data.message);
};
```

2. **Reset Password Page** (`/reset-password?token={token}`)
```typescript
const handleResetPassword = async (token: string, password: string) => {
  const response = await fetch('https://api.tendercradle.com/api/shop/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Redirect to login
    window.location.href = '/login';
  } else {
    alert(data.message);
  }
};
```

---

## Testing with cURL

### Test Admin Forgot Password
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@tendercradle.com"}'
```

### Test Admin Reset Password
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your-token-from-email",
    "password": "NewSecure@Pass123"
  }'
```

### Test Customer Forgot Password
```bash
curl -X POST http://localhost:5000/api/shop/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "customer@example.com"}'
```

### Test Customer Reset Password
```bash
curl -X POST http://localhost:5000/api/shop/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your-token-from-email",
    "password": "NewSecure@Pass123"
  }'
```

---

## Error Handling

### Validation Errors (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "password",
      "message": "Password must contain at least one uppercase letter"
    }
  ]
}
```

### Invalid/Expired Token (400)
```json
{
  "success": false,
  "message": "Invalid or expired reset token."
}
```

### Rate Limit Exceeded (429)
```json
{
  "success": false,
  "message": "Too many login attempts. Please try again in 15 minutes."
}
```

---

## Security Best Practices Implemented

1. **Token Hashing:** Tokens are hashed with SHA-256 before storage
2. **Token Expiry:** Tokens expire after 1 hour
3. **One-Time Use:** Tokens are cleared after successful password reset
4. **No User Enumeration:** Same response whether email exists or not
5. **Strong Passwords:** Enforced password complexity requirements
6. **Rate Limiting:** Prevents brute force attacks
7. **Secure Random:** Uses crypto.randomBytes for token generation
8. **HTTPS Only:** Should be used in production

---

## Environment Variables

No additional environment variables needed. Uses existing email configuration:

```env
# Email Configuration (already configured)
ZEPTO_MAIL_API_KEY=your-api-key
ZEPTO_MAIL_FROM_EMAIL=noreply@tendercradle.com
ZEPTO_MAIL_FROM_NAME=Tender Cradle

# Frontend URL (already configured)
CORS_ORIGIN=https://tendercradle.com
```

---

## Complete Flow Diagram

### Admin Flow
```
1. Admin visits /admin/forgot-password
2. Enters email → POST /api/auth/forgot-password
3. Receives email with reset link
4. Clicks link → /admin/reset-password?token=xxx
5. Enters new password → POST /api/auth/reset-password
6. Redirected to /admin/login
```

### Customer Flow
```
1. Customer visits /forgot-password
2. Enters email → POST /api/shop/auth/forgot-password
3. Receives email with reset link
4. Clicks link → /reset-password?token=xxx
5. Enters new password → POST /api/shop/auth/reset-password
6. Redirected to /login
```

---

## Notes for Frontend Team

1. **Token Extraction:** Extract token from URL query parameter `?token=xxx`
2. **Password Validation:** Show real-time validation for password requirements
3. **Success Handling:** Redirect to login page after successful reset
4. **Error Handling:** Display error messages from API response
5. **Loading States:** Show loading spinner during API calls
6. **Email Confirmation:** Show success message after forgot password request
7. **Token Expiry:** Handle expired token error gracefully with option to request new link

---

## API Summary

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/forgot-password` | POST | None | Request admin password reset |
| `/api/auth/reset-password` | POST | None | Reset admin password |
| `/api/shop/auth/forgot-password` | POST | None | Request customer password reset |
| `/api/shop/auth/reset-password` | POST | None | Reset customer password |

All endpoints are rate-limited to 10 requests per 15 minutes per IP address.
