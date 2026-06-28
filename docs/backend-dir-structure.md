## Overall Request Flow

```text
Client (React)
       │
       ▼
Routes
       │
       ▼
Controller
       │
       ▼
Service
       │
       ▼
Repository
       │
       ▼
Model (MongoDB)
       │
       ▼
MongoDB
```

Everything else (middlewares, validators, utils, helpers, etc.) supports this flow.

---

## 📁 config/

**Purpose:** Store project configuration.

Contains things that configure your application.

Example files:

```text
config/
│
├── db.js
├── cloudinary.js
├── jwt.js
└── mail.js
```

Think:

> "How do I connect to MongoDB?"
>
> "How do I connect to Cloudinary?"

Those belong here.

---

## 📁 constants/

**Purpose:** Store values that rarely change.

Instead of writing

```text
customer
restaurant_owner
super_admin
```

everywhere, keep them in one place.

Example

```text
constants/
│
├── roles.js
├── orderStatus.js
├── reservationStatus.js
└── paymentStatus.js
```

If tomorrow you rename

```text
restaurant
```

to

```text
restaurant_owner
```

You change it once.

---

## 📁 controllers/

**Purpose:** Receive the request and send the response.

Controller should be very small.

It should never contain business logic.

Example

```text
Customer clicks Login

↓

Controller receives request

↓

Calls Auth Service

↓

Returns response
```

Think of a controller as a receptionist.

---

## 📁 middlewares/

**Purpose:** Execute before reaching the controller.

Example

```text
Client

↓

JWT Middleware

↓

Role Middleware

↓

Upload Middleware

↓

Controller
```

Examples

```text
middlewares/

auth.middleware.js

role.middleware.js

upload.middleware.js

error.middleware.js
```

---

## 📁 models/

You already know this.

Represents MongoDB collections.

Example

```text
User

Restaurant

Table

Order

Payment
```

No business logic here.

---

## 📁 repositories/

This is where MongoDB queries belong.

Example

Instead of controller asking MongoDB

```text
Find Restaurant

Find Table

Update Order
```

Controller asks Repository.

Repository talks to MongoDB.

Think

```text
Service

↓

Repository

↓

MongoDB
```

Repository knows database.

Service doesn't.

---

## 📁 routes/

Maps URL → Controller.

Example

```text
POST /login

↓

Auth Controller
```

Routes do nothing except mapping.

Example files

```text
routes/

auth.routes.js

restaurant.routes.js

table.routes.js
```

---

## 📁 services/

⭐ This is the brain.

Business logic belongs here.

Example

Customer places order

Service decides

```
Is restaurant open?

↓

Is table occupied?

↓

Apply offers?

↓

Calculate tax?

↓

Save order?

↓

Update dining session?
```

This folder becomes the biggest one.

---

## 📁 utils/

Reusable utilities.

Independent functions.

Examples

```text
Generate QR

Generate Slug

Format Currency

Calculate Distance

Generate OTP
```

Can be used anywhere.

---

## 📁 validators/

Validate incoming request.

Before reaching service.

Example

Register request

Check

```
Email

Password

Phone
```

If invalid

↓

Return error.

---

## 📁 helpers/

Similar to utils but usually tied to business operations.

Examples

```text
Send Email

Upload Image

Generate Bill PDF

Generate Invoice

Generate Reservation Code
```

Think

Helper = performs a task

Utility = generic reusable function

---

## 📁 uploads/

Temporary storage.

Example

Restaurant uploads

```
Logo

Food Image

Gallery
```

Before sending to Cloudinary.

---

## 📄 app.js

Application configuration.

Example responsibilities

```
Express

Middlewares

Routes

Error Handler
```

No server start here.

---

## 📄 server.js

Entry point.

Responsibilities

```
Load Environment

Connect Database

Start Server
```

Nothing else.

---

# Complete Flow Example

Let's follow **"Customer places an order"**.

```text
Customer clicks

Place Order

        │
        ▼
Route

POST /orders

        │
        ▼
Order Controller

Receives request

        │
        ▼
Validator

Is request valid?

        │
        ▼
Auth Middleware

Customer logged in?

        │
        ▼
Order Service

Restaurant open?

↓

Dining session exists?

↓

Apply offer?

↓

Calculate bill?

↓

Create order?

        │
        ▼
Order Repository

Save into MongoDB

↓

Update Dining Session

↓

Update Table

        │
        ▼
MongoDB

        │
        ▼
Repository

        │
        ▼
Service

        │
        ▼
Controller

        │
        ▼
JSON Response
```

---

# Mental Model

If you're ever unsure where code belongs, ask yourself:

| Folder           | Ask yourself                                                |
| ---------------- | ----------------------------------------------------------- |
| **config**       | "Am I configuring a service?"                               |
| **constants**    | "Is this a fixed value used in many places?"                |
| **routes**       | "Which URL should call which controller?"                   |
| **middlewares**  | "Should this run before the controller?"                    |
| **controllers**  | "Am I just receiving the request and sending the response?" |
| **services**     | "Is this business logic or decision-making?"                |
| **repositories** | "Am I talking to MongoDB?"                                  |
| **models**       | "Is this the database structure?"                           |
| **validators**   | "Am I validating client input?"                             |
| **helpers**      | "Is this a business-related helper task?"                   |
| **utils**        | "Is this a generic reusable function?"                      |
| **uploads**      | "Is this handling temporary file uploads?"                  |
| **app.js**       | "Am I configuring the Express app?"                         |
| **server.js**    | "Am I starting the application?"                            |

---

## One recommendation for Scan & Dine

Your architecture is already quite mature. I would add **one more folder**:

```text
src/
│
├── config/
├── constants/
├── controllers/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── validators/
├── utils/
├── helpers/
├── uploads/
├── docs/
├── logs/          ← application/error logs
├── app.js
└── server.js
```

A `logs/` folder is useful later for debugging, request tracing, and production monitoring. Even if you don't use it immediately, reserving it now keeps the project organized as it grows.
