# Scan & Dine (v2) - Database Design Document

## 1. Database Paradigm & Rationale

Scan & Dine utilizes a **NoSQL Database (MongoDB)** managed via **Mongoose ODM**.

While NoSQL typically favors document embedding, this architecture heavily utilizes **Normalization via References (`ObjectId`)**.

* **Why?** A restaurant's data naturally scales infinitely. If we embedded `Orders` inside a `DiningSession`, or `MenuItems` inside a `Category`, we would risk hitting MongoDB's 16MB document size limit and suffer from slow write performance. By separating them into distinct collections, we maintain ultra-fast reads, flexible pagination, and clean analytics.

## 2. The "Dining Session" Core Concept

The most critical architectural decision in the database is the introduction of the `DiningSession` collection.

* **The Problem:** In standard QR apps, every scan creates a standalone "Order". If a user orders a burger, then 10 minutes later orders a coke, it creates two disconnected bills.
* **The Solution:** The `DiningSession` acts as the **Aggregate Root** for a physical visit.
* Scan QR → Open Session.
* Order Burger → Attach to Session.
* Order Coke → Attach to Session.
* Pay → Close Session.



## 3. Collections & Schema Definitions

### 3.1. Users (`users`)

Manages authentication and profiles for all actors on the platform.

* `role`: Enum (`customer`, `restaurant_owner`, `platform_admin`).
* `notificationPreference`: Booleans for email, SMS, push.
* *Relations:* `restaurantIds` (for owners).

### 3.2. Restaurants (`restaurants`)

Stores the tenant's profile, settings, and physical presence.

* `operationalStatus`: `Open`, `Busy`, `Closed`, `Maintenance` (Controlled daily by the kitchen).
* `isApproved` / `isActive`: Platform-level master switches.
* `settings`: Tax rates, service charges, accepted payment types.
* `address.coordinates`: GeoJSON point for location-based discovery.
* *Relations:* `ownerId` -> `User`.

### 3.3. Tables (`tables`)

Maps the physical layout of the restaurant to digital QR codes.

* `qrToken`: A static, unique UUID printed on the physical QR code.
* `floor` / `section`: String labels (e.g., "Ground Floor", "VIP") for visual table mapping.
* `status`: `available`, `reserved`, `occupied`.
* *Relations:* `currentSessionId` -> `DiningSession`.

### 3.4. Categories (`categories`) & Menu Items (`menuitems`)

The digital menu structure.

* **Categories:** Includes `icon` (emoji/class) for UI enhancement and `sortOrder`.
* **Menu Items:** * `nutrition`: Future-proof object containing `calories` and `servingSize`.
* Badges: `isBestSeller`, `isRecommended`, `isFeatured`.
* `variants`: Sub-schema for sizes/add-ons (e.g., "Large", "Extra Cheese").
* *Relations:* `categoryId` -> `Category`.



### 3.5. Offers (`offers`)

Handles dynamic discounts and promotional codes.

* `discountType` / `discountValue`: Flat amount or percentage.
* `autoApply`: Boolean. If true, system applies without customer typing a code.
* `priority`: Integer. Determines which offer wins if multiple `autoApply` offers are valid.

### 3.6. Reservations (`reservations`)

* `reservationCode`: Auto-generated 6-character string (e.g., `RSV782`).
* `timeSlot`: Start and end times.
* `status`: `pending`, `accepted`, `rejected`, `no_show`.
* *Relations:* Connects `User` to `Table` and subsequently to a `DiningSession`.

### 3.7. Dining Sessions (`diningsessions`) ⭐

The heart of the transactional system.

* `sessionType`: `dine_in`, `takeaway`, or `mixed`.
* `status`: Physical table status (`active`, `closed`).
* `billStatus`: Financial status (`open`, `payment_pending`, `paid`).
* `totals`: Running aggregate of subtotal, tax, and grand total to prevent on-the-fly math delays during checkout.

### 3.8. Orders (`orders`) & Items

Records the actual kitchen tickets.

* `orderedBy`: Identifies *which* specific user at the table placed this sub-order.
* `estimatedReadyTime`: Timestamp for kitchen forecasting.
* `status`: Kitchen fulfillment (`pending`, `preparing`, `ready`, `served`).
* *Relations:* Belongs to `DiningSession`.

### 3.9. Payments (`payments`)

Tracks the financial settlement of a Dining Session.

* `paymentSource`: Platform analytics (`customer_app`, `restaurant_counter`, `upi_qr`).
* `gateway`: Contains Razorpay/Stripe order IDs and signatures.
* *Relations:* 1:1 mapped to a `DiningSession`.

### 3.10. Engagement: Reviews, Favorites, Notifications

Separated out to keep core transactional collections lightweight.

* **Reviews:** Includes `visitType` (`reservation` vs `walk_in`).
* **Favorites:** Links `User` to either a `Restaurant` or `MenuItem`.
* **Notifications:** Inbox system for state changes (e.g., "Order Accepted").

## 4. Indexing Strategy

To ensure the database remains performant at scale, specific indexes are defined at the schema level:

1. **Geospatial Indexes:** `restaurantSchema.index({ 'address.coordinates': '2dsphere' })` for "Restaurants near me" queries.
2. **Compound Unique Indexes:** `tableSchema.index({ restaurantId: 1, tableNumber: 1 }, { unique: true })` prevents duplicate tables.
3. **Lookup Indexes:** `sessionSchema.index({ restaurantId: 1, status: 1 })` allows the Restaurant Admin portal to instantly fetch active tables.
4. **QR Resolution:** `tableSchema.index({ qrToken: 1 })` allows O(1) lookups when a customer scans a table.

## 5. Future Scalability

* The database is designed for **Horizontal Read Scaling**.
* The `restaurantId` acts as a natural shard key if we ever need to implement database sharding for enterprise tenants.
* Sub-schemas (like `nutrition` and `operatingHours`) can be infinitely expanded without breaking existing queries.
