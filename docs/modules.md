# Scan & Dine (v2) - Module Architecture

## 1. Introduction

To maintain a clean, scalable, and testable codebase, the Scan & Dine platform is strictly divided into logical modules. Each module encapsulates specific business logic and interacts with other modules through defined boundaries, preventing tightly coupled "spaghetti code."

---

## 2. Authentication & Identity Module

* **Purpose:** Secures the platform and manages user identities across all three portals (Customer, Restaurant Admin, Super Admin).
* **Responsibilities:** * Handling Registration and Login.
* Generating and validating JWTs (Access and Refresh tokens).
* Enforcing Role-Based Access Control (RBAC).


* **Dependencies:** `User` collection.
* **Future Scope:** OAuth2 integration (Google/Apple login), biometric mobile authentication.

## 3. Restaurant Module

* **Purpose:** Manages the tenant's core physical and operational profile.
* **Responsibilities:**
* Storing address, contact, and media (logo, gallery).
* Managing `operatingHours` and daily `operationalStatus` (Open, Busy, Closed).
* Validating platform approval (`isApproved`).


* **Dependencies:** `Restaurant` collection.
* **Future Scope:** Multi-branch management (franchise support), detailed kitchen capacity forecasting.

## 4. Menu & Catalog Module

* **Purpose:** Digitizes the restaurant's offerings.
* **Responsibilities:**
* Categorizing items with UI enhancements (Icons/Emojis).
* Managing pricing, variants (sizes, add-ons), and dietary tags (Veg/Vegan).
* Highlighting items (`isBestSeller`, `isRecommended`).


* **Dependencies:** `Category`, `MenuItem` collections; depends on `Restaurant`.
* **Future Scope:** Detailed nutritional tracking (macros), inventory countdowns (e.g., "Only 3 left!").

## 5. Table & Spatial Module

* **Purpose:** Maps the physical restaurant layout to digital endpoints.
* **Responsibilities:**
* Generating and storing static `qrTokens`.
* Mapping tables to specific `floor` and `section` areas.
* Tracking physical seat capacity and live table status.


* **Dependencies:** `Table` collection.
* **Future Scope:** Visual drag-and-drop floor plan builder for the Restaurant Admin dashboard.

## 6. Reservation Module

* **Purpose:** Manages pre-arrival customer bookings.
* **Responsibilities:**
* Capturing date, time slots, and guest counts.
* Generating easy-to-read `reservationCode` strings (e.g., RSV782).
* Allowing restaurants to accept, reject, or assign tables to bookings.


* **Dependencies:** `Reservation`, `Table` collections.
* **Future Scope:** Waitlist management, automated SMS reminders.

## 7. Dining Session Module (Core Engine) ⭐

* **Purpose:** Acts as the aggregate root for a customer's physical visit to the restaurant.
* **Responsibilities:**
* Initiating a session upon a QR scan.
* Tracking `sessionType` (Dine-in, Takeaway, Mixed).
* Maintaining real-time financial totals (subtotal, tax, grand total).
* Managing the `billStatus` independently from the physical table status.


* **Dependencies:** `DiningSession`, `Table`, `Restaurant` collections.
* **Future Scope:** "Join Table" feature allowing multiple customer phones to sync to the same active session.

## 8. Order & Kitchen Module

* **Purpose:** Manages individual food requests and kitchen fulfillment.
* **Responsibilities:**
* Tracking which user (`orderedBy`) requested which items.
* Managing line-item prices, variants, and custom notes (e.g., "No onions").
* Progressing order statuses (`Pending` → `Preparing` → `Ready` → `Served`).


* **Dependencies:** `Order`, `MenuItem`, `DiningSession` collections.
* **Future Scope:** AI-driven `estimatedReadyTime` forecasting, dedicated Kitchen Display System (KDS) tablet views.

## 9. Offer & Discount Module

* **Purpose:** Drives customer retention through dynamic pricing.
* **Responsibilities:**
* Validating date windows, minimum order values, and usage limits.
* Applying manual promo codes or executing `autoApply` logic.
* Resolving conflicts using `priority` scoring.


* **Dependencies:** `Offer`, `DiningSession` collections.
* **Future Scope:** Loyalty point system, gamified rewards (e.g., "Spin the wheel").

## 10. Payment & Billing Module

* **Purpose:** Handles the financial settlement of Dining Sessions.
* **Responsibilities:**
* Calculating final taxes and service charges.
* Tracking `paymentSource` (App, Counter, UPI QR).
* Integrating with third-party gateways (Razorpay/Stripe).
* Automatically closing the `DiningSession` upon success.


* **Dependencies:** `Payment`, `DiningSession` collections.
* **Future Scope:** Bill splitting (Split by item, split evenly, or custom amount).

## 11. Review & Favorite Module

* **Purpose:** Handles post-dining engagement and personalization.
* **Responsibilities:**
* Capturing granular ratings (Food, Service, Ambiance) based on `visitType`.
* Allowing customers to save restaurants and specific dishes.


* **Dependencies:** `Review`, `Favorite` collections.
* **Future Scope:** AI sentiment analysis on review text, personalized home-screen recommendations.

## 12. Notification Module

* **Purpose:** (Currently reserved infrastructure) Manages system alerts.
* **Responsibilities:**
* Storing in-app alerts (Order Accepted, Payment Success).
* Tracking read/unread statuses.


* **Dependencies:** `Notification` collection.
* **Future Scope:** Real-time WebSockets, push notifications, automated WhatsApp/SMS updates.
