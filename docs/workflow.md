# Scan & Dine (v2) - Business Workflows

## 1. Purpose

This document outlines the step-by-step business logic and user journeys within the Scan & Dine platform. It explains *how* the application works from a real-world perspective, independent of the underlying code.

---

## 2. Tenant Onboarding Workflow (Restaurant Setup)

Before a customer can scan a QR code, the restaurant must set up its digital presence and physical mapping.

1. **Registration:** Restaurant owner signs up on the Platform Admin portal.
2. **Approval (Optional):** Super Admin reviews and approves the restaurant account (`isApproved: true`).
3. **Profile Configuration:** Owner sets up basic details, operating hours, and location.
4. **Menu Construction:** * Owner creates `Categories` (e.g., Starters, Mains).
* Owner adds `MenuItems` with prices, dietary tags (Veg/Vegan), and variants (e.g., Size: Large).


5. **Table Mapping:** * Owner defines physical spaces (e.g., `Floor: Ground`, `Section: Window`).
* Owner adds tables and specifies seat capacity.


6. **QR Generation:** The system generates a unique, static `qrToken` for each table. The owner downloads and prints these QR codes to place on physical tables.

---

## 3. Customer Discovery & Reservation Workflow

Customers can interact with the platform before arriving at the restaurant.

1. **Discovery:** Customer opens the Customer App (web or mobile) and browses nearby/approved restaurants.
2. **Reservation Request:** Customer selects a date, time slot, and guest count.
3. **Restaurant Action:** Restaurant Admin receives the request and accepts it, optionally assigning a specific table in advance.
4. **Confirmation:** System generates a unique `reservationCode` (e.g., RSV782) and notifies the customer.

---

## 4. The Core Dining Workflow (Scan to Pay)

This is the primary operating loop of the software, utilizing the `DiningSession` concept.

### Phase A: Arrival & Session Initiation

1. **QR Scan:** Customer sits at a table and scans the physical QR code using their phone camera.
2. **Authentication:** * If logged out, customer is prompted for a quick login/registration.
* After login, the system automatically redirects them back to the specific restaurant and table.


3. **Session Creation:** * The system checks the table status.
* If `Available`, it creates a new `DiningSession` and marks the table as `Occupied`.
* If `Occupied` (e.g., they accidentally closed their browser), the system simply rehydrates their existing active session.



### Phase B: Ordering & Kitchen Fulfillment

1. **Menu Browsing:** Customer views the digital menu.
2. **Cart Building:** Customer adds items. They can mix `dine_in` and `takeaway` items.
3. **Placing the Order (Order #1):** Customer submits the cart.
4. **Kitchen Sync:** * The Restaurant Admin dashboard immediately receives a real-time notification via WebSockets.
* The Kitchen marks the order as `Preparing` → `Ready` → `Served`.


5. **Reordering (Order #2):** Customer decides they want dessert. They build a new cart and place Order #2. This new order is silently attached to the *same* `DiningSession`.

### Phase C: Checkout & Payment

1. **Bill Request:** Customer taps "View Bill". The system aggregates all sub-orders (Order #1 + Order #2) and calculates taxes and service charges.
2. **Offer Application:** System checks for valid `Offers`. If an offer is flagged as `autoApply`, it is automatically deducted from the total based on priority rules.
3. **Payment Execution:** * Customer pays via the app (Online Gateway), or pays by Cash/Card at the counter.
* A `Payment` record is generated and linked to the session.


4. **Session Closure:** * `DiningSession.billStatus` updates to `paid`.
* `DiningSession.status` updates to `closed`.
* The physical `Table.status` automatically resets to `Available` for the next customer.



---

## 5. Post-Dining Workflow (Engagement)

1. **Review:** After the session closes, the customer is prompted to leave a 1-5 star rating and comment on the food and service.
2. **Favorites:** The customer can tap a heart icon to add specific dishes or the entire restaurant to their `Favorites` collection for quick access on their next visit.

---