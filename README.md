# 🏛 Scan & Dine Ecosystem

```text
                    PLATFORM
                       │
        ┌──────────────┴──────────────┐
        │                             │
 Platform Admin                Restaurant Owner
        │                             │
        ▼                             ▼
Restaurant Approval         Restaurant Dashboard
                                          │
                                          ▼
                              Customer QR Ordering
```

There are **4 different applications**.

```
1. Platform Admin Dashboard
2. Restaurant Admin Dashboard
3. Customer Web App (QR)
4. Marketing Website
```

---

# 1. Marketing Website

```
/

Features

Pricing

About

Contact

Restaurant Registration

Restaurant Login

Customer Login
```

Purpose:

- Sell the SaaS
- Restaurant onboarding
- Subscription plans
- Documentation

---

# 2. Platform Admin Dashboard

```
Platform Admin Login
        │
        ▼
Dashboard
```

Modules

```
Dashboard

Restaurants

Restaurant Requests

Subscriptions

Users

Payments

Coupons

Analytics

Notifications

Settings
```

### Restaurant Approval Flow

```
Restaurant Registers

↓

Pending

↓

Admin Reviews

↓

Approve

or

Reject
```

Restaurant receives email immediately.

---

# 3. Restaurant Owner Dashboard

After login

```
Overview Dashboard
```

Modules

```
Dashboard

Restaurant Profile

Categories

Menu

Tables

QR Codes

Dining Sessions

Orders

Reservations

Customers

Reviews

Analytics

Staff

Subscription

Settings
```

---

# Restaurant Setup Flow

A newly approved restaurant sees

```
Restaurant Profile
        │
        ▼
Categories
        │
        ▼
Menu
        │
        ▼
Tables
        │
        ▼
Generate QR
        │
        ▼
Ready
```

Restaurant cannot accept customers before setup is complete.

---

# Table Flow

```
Restaurant

↓

Create Table

↓

T-01

↓

QR Token Generated

↓

Generate QR PNG

↓

Print

↓

Paste on Table
```

Each table has

```
QR Token

QR Image

Status

Current Session
```

---

# Customer Journey

Customer sits.

```
Table

↓

Scans QR
```

QR contains only

```
https://app.scanndine.com/scan/{qrToken}
```

Nothing else.

---

# Scan Flow

```
QR Token

↓

Resolve Table

↓

Restaurant Active?

↓

Table Active?

↓

Find ACTIVE Session
```

If exists

```
Resume
```

Else

```
Create Session
```

---

# Session Flow

```
Dining Session

↓

Session Token

↓

Guest Count

↓

Restaurant

↓

Table
```

Session owns everything.

---

# Authentication

## First Visit

Customer scans.

```
Browse Menu

↓

Add to Cart
```

No login.

When placing the order:

```
Continue

↓

Login

or

Register

↓

OTP / Password

↓

Account Linked

↓

Continue
```

This removes friction.

---

# Returning Customer

```
Scan

↓

Session Token

↓

Customer Found

↓

Continue
```

No repeated onboarding.

---

# Menu Flow

```
Restaurant

↓

Categories

↓

Menu

↓

Variants

↓

Offers
```

Customer sees only

```
Available Items
```

Hidden items never appear.

---

# Cart

Cart belongs to

```
Dining Session
```

Not User.

Reason

```
Guest

↓

Login Later

↓

Cart Stays
```

---

# Ordering

```
Cart

↓

Place Order

↓

Kitchen

↓

Preparing

↓

Ready

↓

Served
```

Order Status

```
Pending

Confirmed

Preparing

Ready

Served

Completed

Cancelled
```

---

# Multiple Orders

Example

```
Starter

↓

Order #1

20 min

↓

Main Course

↓

Order #2

30 min

↓

Dessert

↓

Order #3
```

Everything belongs to

```
One Dining Session
```

One final bill.

---

# Kitchen

Kitchen sees

```
Incoming Orders

↓

Preparing

↓

Ready
```

No payment logic.

Only food.

---

# Waiter

Waiter sees

```
Table

↓

Order Ready

↓

Serve
```

Future module.

---

# Billing

Session continuously updates

```
Subtotal

Discount

Tax

Service Charge

Grand Total
```

Real-time.

---

# Payment

Customer

```
Pay Online

or

Pay at Counter
```

If online

```
Razorpay

↓

Success

↓

Bill Paid

↓

Close Session
```

If counter

```
Restaurant

↓

Mark Paid

↓

Close Session
```

---

# Session Completion

```
Paid

↓

Session Completed

↓

Table AVAILABLE

↓

Feedback
```

---

# Reviews

Only after

```
Completed Session
```

can customer review.

Prevents fake reviews.

---

# Reservation Flow

Customer

```
Reserve Table

↓

Restaurant Confirms

↓

Arrival

↓

Reservation

↓

Dining Session
```

Reservation ends.

Session begins.

---

# Dashboard Analytics

Restaurant

```
Revenue

Orders

Average Bill

Peak Hours

Popular Items

Table Utilization

Customer Retention

Best Selling Items
```

---

# Platform Analytics

Admin

```
Restaurants

MRR

ARR

Subscriptions

Active Restaurants

Orders

Revenue

Growth
```

---

# Security

Authentication

```
Customer

Restaurant Owner

Platform Admin
```

JWT

↓

Refresh Token

↓

Role Authorization

↓

Tenant Isolation

Restaurant can never access another restaurant's data.

---

# Backend Architecture

Every module follows the same structure:

```
Validator

↓

Repository

↓

Transformer

↓

Service

↓

Controller

↓

Routes
```

Repositories only access data.

Services contain business logic.

Controllers handle HTTP.

Transformers shape API responses.

---

# Monorepo Structure

```
apps/
├── client
├── restaurant-admin
├── super-admin
└── server

packages/
├── ui
├── auth
├── api
├── query
├── config
└── utils
```

---

# Current Backend Progress

```
Authentication
├── ✅ Customer Auth
├── ✅ Restaurant Auth
├── ✅ Platform Admin Auth
├── ✅ Email Verification
├── ✅ Password Reset

Restaurant
├── ✅ Registration
├── ✅ Approval
├── ✅ Profile
├── ✅ Categories
├── ✅ Menu
├── ✅ Tables
└── ✅ Dining Sessions

Pending
├── ⬜ Customer Scan Flow
├── ⬜ QR Generation
├── ⬜ Cart
├── ⬜ Orders
├── ⬜ Kitchen Management
├── ⬜ Payments
├── ⬜ Reservations
├── ⬜ Reviews
├── ⬜ Analytics
├── ⬜ Notifications
├── ⬜ Staff Management
└── ⬜ Subscription & Billing
```

---

# One Architectural Change I'd Make Before the Frontend

After everything we've built, there is **one change** I would make to the roadmap:

```
Customer Scan
        ↓
Session Bootstrap
        ↓
Restaurant Metadata
        ↓
Categories
        ↓
Menu
        ↓
Cart
        ↓
Authentication (only when required)
        ↓
Order
        ↓
Payment
```

Instead of making the frontend fetch restaurant info, categories, menu, table, and session separately, I'd design a **single "Session Bootstrap API"**.

For example:

```http
GET /scan/:qrToken
```

would return:

```json
{
  "restaurant": { ... },
  "table": { ... },
  "session": { ... },
  "customer": null,
  "categories": [ ... ],
  "menu": [ ... ]
}
```
