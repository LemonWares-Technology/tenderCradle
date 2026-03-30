# Enrollment System API Specification

## Overview
This document specifies the backend API endpoints required for the Tender Cradle enrollment system. The system allows parents to submit enrollment applications for their children and enables administrators to review, approve, or reject applications.

---

## Base URL
```
/api/v1
```

---

## Authentication
All admin endpoints require JWT authentication with admin role.
- Header: `Authorization: Bearer <token>`

---

## Endpoints

### 1. Submit Enrollment Application
**Endpoint:** `POST /enrollments`  
**Auth:** None (Public)  
**Content-Type:** `multipart/form-data`

**Request Body:**
```javascript
{
  // Parent Information
  parentFirstName: string (required),
  parentLastName: string (required),
  parentEmail: string (required, valid email),
  parentPhone: string (required),
  parentAddress: string (required),
  parentCity: string (required),
  parentState: string (required),
  
  // Child Information
  childFirstName: string (required),
  childLastName: string (required),
  childDOB: string (required, ISO 8601 date),
  childGender: string (required, enum: "male", "female", "other"),
  
  // Medical Information
  allergies: string (optional),
  medications: string (optional),
  medicalConditions: string (optional),
  doctorName: string (required),
  doctorPhone: string (required),
  
  // Program Selection
  programType: string (required, enum: "Infants (3-18 Months)", "Toddlers (18M-3Y)", "Preschool (3-5Y)"),
  enrollmentType: string (required, enum: "Full-Time", "Part-Time"),
  startDate: string (required, ISO 8601 date),
  
  // Emergency Contacts
  emergencyName1: string (required),
  emergencyPhone1: string (required),
  emergencyRelation1: string (required),
  emergencyName2: string (required),
  emergencyPhone2: string (required),
  emergencyRelation2: string (required),
  
  // File Uploads
  birthCertificate: File (required, PDF/JPG/PNG, max 5MB),
  immunizationRecords: File (required, PDF/JPG/PNG, max 5MB)
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Enrollment application submitted successfully",
  "data": {
    "id": "uuid",
    "status": "pending",
    "submittedAt": "2025-03-30T10:30:00Z",
    "parentEmail": "john@example.com"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parentEmail",
      "message": "Invalid email format"
    }
  ]
}
```

---

### 2. Get All Enrollments (Admin)
**Endpoint:** `GET /enrollments`  
**Auth:** Required (Admin)

**Query Parameters:**
- `status` (optional): Filter by status ("pending", "approved", "rejected")
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `search` (optional): Search by parent or child name

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "status": "pending",
      "submittedAt": "2025-03-30T10:30:00Z",
      "parentFirstName": "John",
      "parentLastName": "Doe",
      "parentEmail": "john@example.com",
      "parentPhone": "+234 800 123 4567",
      "parentAddress": "123 Main St",
      "parentCity": "Lagos",
      "parentState": "Lagos State",
      "childFirstName": "Emma",
      "childLastName": "Doe",
      "childDOB": "2022-05-15",
      "childGender": "female",
      "allergies": "Peanuts",
      "medications": "None",
      "medicalConditions": "None",
      "doctorName": "Dr. Smith",
      "doctorPhone": "+234 800 999 8888",
      "programType": "Toddlers (18M-3Y)",
      "enrollmentType": "Full-Time",
      "startDate": "2025-04-01",
      "emergencyName1": "Jane Doe",
      "emergencyPhone1": "+234 800 111 2222",
      "emergencyRelation1": "Aunt",
      "emergencyName2": "Bob Smith",
      "emergencyPhone2": "+234 800 333 4444",
      "emergencyRelation2": "Uncle"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

---

### 3. Get Single Enrollment (Admin)
**Endpoint:** `GET /enrollments/:id`  
**Auth:** Required (Admin)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "pending",
    "submittedAt": "2025-03-30T10:30:00Z",
    // ... all enrollment fields (same as in list response)
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Enrollment not found"
}
```

---

### 4. Update Enrollment Status (Admin)
**Endpoint:** `PATCH /enrollments/:id/status`  
**Auth:** Required (Admin)

**Request Body:**
```json
{
  "status": "approved" // or "rejected"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Enrollment status updated successfully",
  "data": {
    "id": "uuid",
    "status": "approved",
    "updatedAt": "2025-03-30T11:00:00Z"
  }
}
```

**Side Effects:**
- Send email notification to parent about status change
- If approved: Send welcome email with next steps
- If rejected: Send polite rejection email

---

### 5. Download Document (Admin)
**Endpoint:** `GET /enrollments/:id/documents/:documentType`  
**Auth:** Required (Admin)

**Path Parameters:**
- `id`: Enrollment ID
- `documentType`: "birthCertificate" or "immunizationRecords"

**Response (200 OK):**
- Content-Type: `application/pdf` or `image/jpeg` or `image/png`
- Binary file data

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Document not found"
}
```

---

## Database Schema Suggestion

### enrollments table
```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  
  -- Parent Info
  parent_first_name VARCHAR(100) NOT NULL,
  parent_last_name VARCHAR(100) NOT NULL,
  parent_email VARCHAR(255) NOT NULL,
  parent_phone VARCHAR(50) NOT NULL,
  parent_address TEXT NOT NULL,
  parent_city VARCHAR(100) NOT NULL,
  parent_state VARCHAR(100) NOT NULL,
  
  -- Child Info
  child_first_name VARCHAR(100) NOT NULL,
  child_last_name VARCHAR(100) NOT NULL,
  child_dob DATE NOT NULL,
  child_gender VARCHAR(20) NOT NULL,
  
  -- Medical Info
  allergies TEXT,
  medications TEXT,
  medical_conditions TEXT,
  doctor_name VARCHAR(200) NOT NULL,
  doctor_phone VARCHAR(50) NOT NULL,
  
  -- Program Info
  program_type VARCHAR(50) NOT NULL,
  enrollment_type VARCHAR(20) NOT NULL,
  start_date DATE NOT NULL,
  
  -- Emergency Contacts
  emergency_name_1 VARCHAR(200) NOT NULL,
  emergency_phone_1 VARCHAR(50) NOT NULL,
  emergency_relation_1 VARCHAR(50) NOT NULL,
  emergency_name_2 VARCHAR(200) NOT NULL,
  emergency_phone_2 VARCHAR(50) NOT NULL,
  emergency_relation_2 VARCHAR(50) NOT NULL,
  
  -- Document Paths (store file paths or URLs)
  birth_certificate_path TEXT NOT NULL,
  immunization_records_path TEXT NOT NULL,
  
  -- Timestamps
  submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  -- Indexes
  INDEX idx_status (status),
  INDEX idx_parent_email (parent_email),
  INDEX idx_submitted_at (submitted_at)
);
```

---

## File Storage
- Store uploaded files in a secure location (e.g., AWS S3, local storage with restricted access)
- File naming convention: `{enrollmentId}_{documentType}_{timestamp}.{extension}`
- Implement virus scanning for uploaded files
- Set file size limit: 5MB per file
- Allowed formats: PDF, JPG, JPEG, PNG

---

## Email Notifications

### 1. Application Submitted (to Parent)
**Subject:** "Enrollment Application Received - Tender Cradle"
**Content:**
- Thank you message
- Application ID
- Expected review timeline (2-3 business days)
- Contact information for questions

### 2. Application Approved (to Parent)
**Subject:** "Welcome to Tender Cradle Family! 🎉"
**Content:**
- Congratulations message
- Next steps (payment, orientation schedule)
- Required documents to bring
- Contact person details

### 3. Application Rejected (to Parent)
**Subject:** "Update on Your Enrollment Application"
**Content:**
- Polite rejection message
- Reason (if applicable)
- Invitation to reapply in the future
- Alternative recommendations

### 4. New Application (to Admin)
**Subject:** "New Enrollment Application Received"
**Content:**
- Parent name
- Child name
- Program type
- Link to admin dashboard

---

## Security Considerations
1. Validate all input data
2. Sanitize file uploads (check MIME types, scan for viruses)
3. Implement rate limiting on public endpoint (max 5 submissions per IP per hour)
4. Use HTTPS for all communications
5. Encrypt sensitive data at rest
6. Implement CORS properly
7. Log all status changes with admin user ID

---

## Testing Checklist
- [ ] Submit enrollment with valid data
- [ ] Submit enrollment with invalid email
- [ ] Submit enrollment with missing required fields
- [ ] Submit enrollment with files exceeding size limit
- [ ] Submit enrollment with invalid file types
- [ ] Admin can view all enrollments
- [ ] Admin can filter enrollments by status
- [ ] Admin can search enrollments
- [ ] Admin can approve enrollment
- [ ] Admin can reject enrollment
- [ ] Admin can download documents
- [ ] Email notifications are sent correctly
- [ ] Rate limiting works on public endpoint
- [ ] Unauthorized users cannot access admin endpoints

---

## Notes for Backend Developer
1. Use proper validation library (e.g., Joi, Yup, class-validator)
2. Implement proper error handling and logging
3. Use transactions for status updates
4. Consider implementing soft deletes
5. Add audit trail for admin actions
6. Implement proper file cleanup for rejected applications (after 30 days)
7. Consider adding webhook support for future integrations
8. Add API documentation using Swagger/OpenAPI

---

## Frontend Integration
The frontend is already built and will call these endpoints using axios. The API client is configured at `lib/api/client.ts` and enrollment-specific calls are in `lib/api/enrollments.ts`.

Frontend routes:
- User enrollment form: `/enrollment/apply`
- Admin management: `/admin/enrollments`
