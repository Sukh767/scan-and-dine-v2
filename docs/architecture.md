# Scan & Dine (v2) - Software Architecture Document

## 1. Project Overview

Scan & Dine is a multi-tenant SaaS platform designed to modernize the restaurant dining experience. It replaces traditional paper menus and manual ordering with a seamless, QR-driven digital workflow. By introducing the concept of a **Dining Session**, the platform bridges the gap between individual orders and unified billing, catering to dine-in, takeaway, and mixed scenarios.

## 2. High-Level Architecture

The system follows a decoupled, API-driven architecture utilizing a Monorepo structure. It consists of a centralized Node.js/Express backend that serves three distinct Vite/React client applications.

* **Frontend:** React.js (Vite), Redux Toolkit (RTK Query), Tailwind CSS.
* **Backend:** Node.js, Express.js (ES Modules).
* **Database:** MongoDB (Mongoose ODM).
* **Real-time:** Socket.io for live order/kitchen synchronization.

## 3. Client Architecture

To ensure zero code leakage, optimal bundle sizes, and role-specific performance, the frontend is physically split into three distinct Single Page Applications (SPAs):

1. **Customer Portal (Mobile-First):** Lightweight app for discovery, QR scanning, menu browsing, and checkout. Optimized for fast loading over mobile data.
2. **Restaurant Admin Portal (Tablet/Desktop):** High-interaction dashboard for restaurant owners and kitchen staff. Handles live session tracking, order fulfillment, and menu management.
3. **Super Admin Portal (Desktop):** Platform-level dashboard for SaaS management, tenant (restaurant) approval, and global revenue analytics.

## 4. Backend Architecture

The backend is a monolithic RESTful API designed with modular routing.

* **API Gateway:** A single Express server routes traffic based on the consumer (`/api/users`, `/api/restaurant`, `/api/admin`).
* **State Management:** Fully stateless REST API utilizing JWT (JSON Web Tokens) for authentication.
* **Error Handling:** Centralized custom middleware for consistent error formatting (capturing Mongoose validation, CastErrors, and JWT expirations).

## 5. Database Architecture

A NoSQL database (MongoDB) is used, structured relationally via Mongoose `ObjectId` references to maintain data normalization.

* **Core Philosophy:** Entities are separated (Users, Restaurants, Tables, Menus) and linked by IDs to prevent deep nesting limits and ensure fast queries.
* **The "Dining Session" Paradigm:** Instead of orders standing alone, every scan initiates a `DiningSession`. Multiple `Orders` belong to one `DiningSession`, and one `Payment` closes the `DiningSession`.

## 6. Module Architecture

The system is divided into logically independent modules that share the same underlying database:

* **Auth Module:** JWT issuance, role-based access control (RBAC).
* **Restaurant Module:** Profile, operating hours, operational status.
* **Menu & Offer Module:** Categories, items, variants, priority-based auto-applying discounts.
* **Table & QR Module:** Location mapping (floor/section), static QR token generation.
* **Dining Management Module:** The core engine handling Sessions, Sub-orders, and Kitchen statuses.
* **Billing Module:** Aggregation of session orders, tax/service charge calculation, and payment gateway integration.

## 7. Core Workflows

### Authentication Flow

1. User requests login with credentials.
2. Server validates and returns an Access Token (short-lived) and Refresh Token (long-lived).
3. Client stores tokens and attaches the Access Token as a Bearer header via RTK Query for subsequent secure requests.

### The QR & Dining Session Flow

1. Customer scans static QR on Table.
2. App reads `qrToken` and calls API.
3. System identifies Table and Restaurant.
4. **Logic Fork:**
* *If Table is Available:* Create new `DiningSession`, change table status to `Occupied`.
* *If Table is Occupied:* Rehydrate existing `DiningSession` for the customer.


5. Customer adds items to cart and places an `Order` (Order #1).
6. Customer places another `Order` 30 minutes later (Order #2).
7. Customer requests bill. System aggregates all Orders in the `DiningSession`.
8. Payment succeeds -> `DiningSession` closed -> Table status resets to `Available`.

## 8. Deployment Architecture (Target)

* **Monorepo Manager:** pnpm workspaces / Turborepo.
* **Frontend Hosting:** Vercel or AWS Amplify (3 separate deployments mapped to subdomains).
* **Backend Hosting:** Render, Railway, or AWS EC2 (Node environment).
* **Database Hosting:** MongoDB Atlas (Cloud Database).
* **Asset Storage:** Cloudinary or AWS S3 (for menu images, restaurant logos, and generated QR codes).