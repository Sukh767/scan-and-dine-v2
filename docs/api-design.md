# Scan & Dine (v2) - API Design Document

## 1. API Standards & Conventions

The platform exposes a RESTful API. All requests and responses communicate via `application/json`.

### 1.1. Standard Response Envelope

To ensure predictable parsing on the frontend, every endpoint returns data wrapped in a standard envelope:

```json
{
  "success": true,
  "message": "Human readable success or error message",
  "data": { ... } // Or an array [...]
}

```

### 1.2. HTTP Status Codes

* **200 OK** / **201 Created**: Request successful.
* **400 Bad Request**: Validation errors or missing fields.
* **401 Unauthorized**: Missing, invalid, or expired JWT.
* **403 Forbidden**: User lacks the correct role (e.g., Customer trying to access Admin route).
* **404 Not Found**: Resource does not exist.
* **409 Conflict**: Duplicate data (e.g., Email already exists).

---

## 2. Authentication Module

### 2.1. Register User

* **Endpoint:** `POST /api/auth/register`
* **Auth Required:** No
* **Request Body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "securepassword123",
  "phone": "+919876543210",
  "role": "customer"
}

```


* **Response (201):** User object (excluding password) + JWT Access & Refresh tokens.

### 2.2. Login

* **Endpoint:** `POST /api/auth/login`
* **Auth Required:** No
* **Request Body:**
```json
{
  "email": "rahul@example.com",
  "password": "securepassword123"
}

```


* **Response (200):** User object + `accessToken` + `refreshToken`.

---

## 3. Discovery & Catalog Module

### 3.1. Browse Restaurants

* **Endpoint:** `GET /api/restaurants`
* **Auth Required:** No
* **Query Params:** `?lat=17.3850&lng=78.4867&cuisine=Italian&search=Pizza`
* **Response (200):** Array of Restaurant objects filtered by `isApproved: true` and `operationalStatus: 'Open'`.

### 3.2. Get Restaurant Menu

* **Endpoint:** `GET /api/restaurants/:slug/menu`
* **Auth Required:** No
* **Response (200):** Grouped JSON containing Categories (with `icon`) and their nested Menu Items.

---

## 4. Dining Session Module (Core Engine)

### 4.1. Scan QR (Initiate/Rehydrate Session)

* **Endpoint:** `POST /api/sessions/scan`
* **Auth Required:** Yes (Customer)
* **Request Body:**
```json
{
  "qrToken": "550e8400-e29b-41d4-a716-446655440000"
}

```


* **Logic:** Resolves the `qrToken` to a `Table`. If the table is Available, creates a Session. If Occupied by the same user, returns the active Session.
* **Response (200/201):**
```json
{
  "sessionId": "65ab...123",
  "restaurantId": "65ab...456",
  "tableNumber": "12",
  "sessionType": "dine_in",
  "billStatus": "open"
}

```



### 4.2. Get Live Session Bill

* **Endpoint:** `GET /api/sessions/:id/bill`
* **Auth Required:** Yes (Customer or Restaurant Admin)
* **Response (200):** Returns the Session object populated with all sub-orders, automatically applied Offers based on `priority`, `tax`, and `grandTotal`.

---

## 5. Order & Kitchen Module

### 5.1. Place an Order (Add to Session)

* **Endpoint:** `POST /api/orders`
* **Auth Required:** Yes (Customer)
* **Request Body:**
```json
{
  "sessionId": "65ab...123",
  "items": [
    {
      "menuItemId": "65cd...789",
      "quantity": 2,
      "itemType": "dine_in",
      "customNote": "No onions please"
    },
    {
      "menuItemId": "65cd...999",
      "quantity": 1,
      "itemType": "takeaway"
    }
  ]
}

```


* **Response (201):** The created `Order` document with status `pending`, attached to the provided `sessionId`. (This automatically triggers a WebSocket event to the Kitchen).

### 5.2. Update Order Status (Kitchen)

* **Endpoint:** `PATCH /api/orders/:id/status`
* **Auth Required:** Yes (Restaurant Admin)
* **Request Body:**
```json
{
  "status": "preparing", 
  "estimatedReadyTime": "2026-06-29T14:30:00Z"
}

```


* **Response (200):** Updated Order object. (Triggers WebSocket event to Customer app).

---

## 6. Offer Module

### 6.1. Apply Promo Code Manually

* **Endpoint:** `POST /api/sessions/:id/apply-offer`
* **Auth Required:** Yes (Customer)
* **Request Body:**
```json
{
  "code": "WELCOME50"
}

```


* **Response (200):** Recalculated `totals` object if valid.
* **Error (400):** "Code expired" or "Minimum order value not met".

---

## 7. Payment Module

### 7.1. Initiate Payment

* **Endpoint:** `POST /api/payments`
* **Auth Required:** Yes (Customer)
* **Request Body:**
```json
{
  "sessionId": "65ab...123",
  "method": "online",
  "paymentSource": "customer_app"
}

```


* **Response (200):** Generates and returns Payment Intent ID for Stripe/Razorpay SDK integration. Updates `DiningSession.billStatus` to `payment_pending`.

### 7.2. Confirm Cash/Counter Payment

* **Endpoint:** `PATCH /api/payments/confirm/:sessionId`
* **Auth Required:** Yes (Restaurant Admin)
* **Request Body:**
```json
{
  "method": "cash"
}

```


* **Response (200):** Marks Payment as `completed`. Automatically updates `DiningSession.billStatus` to `paid`, `DiningSession.status` to `closed`, and frees the physical `Table`.
