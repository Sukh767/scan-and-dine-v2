# Scan & Dine — Database Schema Reference

All collections live in a single MongoDB database.  
Relations use ObjectId references (`.populate()` in Mongoose).

---

## users

```js
{
  _id, name, email, phone,
  password,          // bcrypt-hashed, select:false
  role,              // 'customer' | 'restaurant' | 'super_admin'
  restaurantId,      // → restaurants._id  (restaurant role only)
  avatar, isVerified, isActive, lastLoginAt,
  createdAt, updatedAt
}
```

**Indexes:** `email` (unique), `role`, `restaurantId`

---

## restaurants

```js
{
  _id, ownerId,      // → users._id
  name, slug,        // slug auto-generated, unique
  description, logo, coverImage, images,
  cuisineTypes,      // ['Indian', 'Chinese']
  address: {
    street, city, state, country, pincode,
    coordinates: { type:'Point', coordinates:[lng,lat] }
  },
  phone, email, website,
  operatingHours: {
    monday: { isOpen, open:'09:00', close:'22:00' }, ...
  },
  subscription: { plan, status, trialEndsAt, currentPeriodEnd },
  isApproved, isActive,
  stats: { totalOrders, totalRevenue, averageRating, totalReviews },
  settings: { acceptsReservations, acceptsOnlinePayment,
               autoAcceptOrders, taxRate, serviceCharge, currency },
  createdAt, updatedAt
}
```

**Indexes:** `ownerId`, `slug` (unique), `isApproved+isActive`, `coordinates` (2dsphere)

---

## tables

```js
{
  _id, restaurantId,  // → restaurants._id
  tableNumber,        // '1', 'T-3', 'Rooftop-2'
  label,              // optional display name
  capacity,
  qrToken,            // UUID, embedded in printed QR — never changes
  qrImageUrl,         // Cloudinary URL of generated QR image
  status,             // 'available' | 'reserved' | 'occupied' | 'inactive'
  currentSessionId,   // → diningsessions._id  (null when free)
  isActive,
  createdAt, updatedAt
}
```

**Indexes:** `restaurantId+tableNumber` (unique compound), `restaurantId+status`, `qrToken`

---

## categories

```js
{
  _id, restaurantId,  // → restaurants._id
  name, description, image,
  sortOrder,          // display order (ascending)
  isActive,
  createdAt, updatedAt
}
```

**Indexes:** `restaurantId+isActive+sortOrder`

---

## menuitems

```js
{
  _id, restaurantId, categoryId,
  name, description, price,
  images,
  isVeg, isVegan, isGlutenFree,
  spiceLevel,         // 'none'|'mild'|'medium'|'hot'|'extra_hot'
  variants: [{ _id, name, price }],
  allowCustomNote,
  preparationTime,    // minutes
  sortOrder,
  isFeatured, isAvailable, isActive,
  rating: { average, count },
  createdAt, updatedAt
}
```

**Indexes:** `restaurantId+categoryId+isActive+sortOrder`, `restaurantId+isFeatured`

---

## diningsessions  ← the core concept

```js
{
  _id, restaurantId, tableId, customerId,
  reservationId,     // → reservations._id  (optional)
  status,            // 'active'|'awaiting_payment'|'paid'|'closed'|'abandoned'
  totals: {
    subtotal, discount, tax, serviceCharge, grandTotal
  },
  appliedOfferId,    // → offers._id
  guestCount,
  tableNote,
  startedAt, closedAt,
  createdAt, updatedAt
}
```

**Indexes:** `restaurantId+status`, `tableId+status`, `customerId`, `restaurantId+createdAt`

> Orders are **not** embedded — query `orders` collection by `sessionId` for full flexibility.

---

## orders

```js
{
  _id, restaurantId, sessionId, customerId, tableId,
  orderNumber,       // sequential within session: 1, 2, 3…
  items: [{
    _id, menuItemId,
    name, price,     // snapshot at order time
    variantId, variantName,
    quantity, subtotal,
    customNote,
    status           // 'pending'|'preparing'|'ready'|'served'
  }],
  subtotal,
  status,            // 'pending'|'accepted'|'preparing'|'ready'|'served'|'cancelled'
  restaurantNote,
  acceptedAt, preparedAt, servedAt, cancelledAt,
  createdAt, updatedAt
}
```

**Indexes:** `sessionId+orderNumber`, `restaurantId+status`, `restaurantId+createdAt`

---

## payments

```js
{
  _id, restaurantId, sessionId,  // sessionId unique (one payment per session)
  customerId,
  amount: { subtotal, discount, tax, serviceCharge, grandTotal },
  method,            // 'online'|'cash'|'card'|'upi'
  status,            // 'pending'|'completed'|'failed'|'refunded'
  gateway: { name, orderId, paymentId, signature },
  confirmedBy, confirmedAt,
  paidAt, refundedAt, refundReason,
  createdAt, updatedAt
}
```

**Indexes:** `restaurantId+createdAt`, `customerId`, `status`

---

## reservations

```js
{
  _id, restaurantId, customerId,
  tableId,           // assigned when restaurant accepts
  date,
  timeSlot: { start:'19:00', end:'21:00' },
  guestCount,
  specialRequests,
  status,            // 'pending'|'accepted'|'rejected'|'cancelled'|'completed'|'no_show'
  rejectionReason,
  cancelledBy, cancelledAt,
  checkedInAt,
  sessionId,         // → diningsessions._id  (created on check-in)
  createdAt, updatedAt
}
```

**Indexes:** `restaurantId+date+status`, `customerId+status`, `tableId+date`

---

## offers

```js
{
  _id, restaurantId,
  title, description,
  code,              // optional promo code
  discountType,      // 'percentage' | 'flat'
  discountValue,
  minOrderValue,
  maxDiscount,
  applicableCategories: [categoryId],
  applicableItems:      [menuItemId],
  validFrom, validUntil,
  usageLimit, usageCount, perUserLimit,
  isActive,
  createdAt, updatedAt
}
```

**Indexes:** `restaurantId+isActive`, `code`

---

## reviews

```js
{
  _id, restaurantId, customerId,
  sessionId,         // unique — one review per session
  rating: { overall, food, service, ambiance },
  comment,
  images,
  reply: { text, repliedAt, repliedBy },
  isPublic,
  createdAt, updatedAt
}
```

**Indexes:** `restaurantId+isPublic+createdAt`, `customerId`

---

## Key relationships (summary)

```
users ─────────────────┬──► restaurants (ownerId)
                       └──► diningsessions (customerId)
                            orders (customerId)
                            payments (customerId)
                            reservations (customerId)
                            reviews (customerId)

restaurants ───────────┬──► tables
                       ├──► categories
                       ├──► menuitems
                       ├──► offers
                       ├──► diningsessions
                       ├──► orders
                       ├──► payments
                       ├──► reservations
                       └──► reviews

tables ───────────────────► diningsessions (currentSessionId)
                            reservations

diningsessions ───────────► orders (sessionId)
                            payments (sessionId, unique)
                            reviews (sessionId, unique)
                            reservations (sessionId)
```
