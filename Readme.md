
# 🛍️ E-Commerce Backend API – Resolute Solution Assignment

A robust and modular **E-Commerce Backend API** built using **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
This project demonstrates authentication, authorization, role-based access, order management, and transactional checkout.

---

## 🚀 Features

✅ **Authentication & Authorization**  
- JWT-based user login and registration  
- Role-based access control (Admin/User)

✅ **Admin Functionalities**  
- Add, update, delete products  
- Manage order statuses  
- View all user orders  

✅ **User Functionalities**  
- Add products to cart  
- Checkout with stock validation  
- View and pay orders  

✅ **Product Management**  
- Structured stock tracking (`available`, `reserved`)  
- Transaction-safe stock updates  

✅ **Security & Validation**  
- JWT protection for all private routes  
- Joi schema-based validation for incoming data  

✅ **Clean Project Structure**  
- Separated controllers, routes, and services  
- Reusable middleware for auth and role checks  

---

## 🧩 Tech Stack

| Layer       | Technology             |
|-------------|------------------------|
| **Runtime** | Node.js               |
| **Framework**| Express.js            |
| **Database** | MongoDB with Mongoose |
| **Auth**    | JSON Web Token (JWT)  |
| **Validation** | Joi                |
| **Language** | JavaScript (ES6)     |

---

## 📁 Project Structure

```
📦 E-Commerce-Backend
├── 📁 app
│   ├── 📁 config
│   │   └── database.js                # MongoDB connection setup
│   ├── 📁 controllers
│   │   ├── admin.controller.js        # Admin functions (orders, status)
│   │   ├── auth.controller.js         # Register & login controller
│   │   ├── cart.controller.js         # Cart management
│   │   ├── orders.controller.js       # Orders handling
│   │   └── products.controller.js     # Product CRUD logic
│   ├── 📁 middleware
│   │   ├── adminAuth.middleware.js    # Admin-only access
│   │   ├── auth.middleware.js         # JWT validation
│   │   └── role.middleware.js         # Role-specific checks
│   ├── 📁 models
│   │   ├── cart.model.js              # Cart schema
│   │   ├── order.model.js             # Order schema
│   │   ├── product.model.js           # Product schema
│   │   └── user.model.js              # User schema
│   ├── 📁 routes
│   │   ├── admin.route.js             # Admin endpoints
│   │   ├── auth.route.js              # Auth endpoints
│   │   ├── cart.route.js              # Cart endpoints
│   │   ├── order.route.js             # Orders endpoints
│   │   └── product.route.js           # Product endpoints
│   └── 📁 services
│       ├── admin.service.js           # Admin logic
│       ├── auth.service.js            # Auth business logic
│       ├── cart.service.js            # Cart business logic
│       ├── order.service.js           # Order business logic
│       └── product.service.js         # Product CRUD logic
├── .gitignore                         # Git ignore file
├── package.json                       # Project dependencies and scripts
├── README.md                          # Project documentation
└── server.js                          # Entry point of the app
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/sks9699/ecommerce-microservice-backend.git
cd ecommerce-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root and add the following:

```env
PORT = 3001
MONGODB_URI = mongodb+srv://physcologic6666_db_user:abc@securly.bibzkzw.mongodb.net
JWT_SECRET= resolutesolution
PORT = 3001
```

### 4. Run the Application
```bash
npm start
```

The server will start at:  
👉 **[http://localhost:3001](http://localhost:3001)**

---

## 🔑 Authentication

All protected routes require a valid **JWT Token** in the `Authorization` header.

Example:
```
Authorization: Bearer <your_token>
```

---

## 🧠 API Endpoints

### 🔹 Auth Routes
| Method | Endpoint             | Description       |
|--------|----------------------|-------------------|
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login & get token |

### 🔹 Product Routes (Admin Only)
| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| POST   | `/api/products/create`     | Create new product |
| GET    | `/api/products/allproduct`     | Get all products   |
| PUT    | `/api/products/update/:id` | Update product     |
| DELETE | `/api/products/delete/:id` | Delete product     |

### 🔹 Cart Routes
| Method | Endpoint                     | Description             |
|--------|------------------------------|-------------------------|

| POST   | `/api/cart/items`            | Add or update cart item |
| DELETE | `/api/cart/items/:productId` | Remove item from cart   |
| GET    | `/api/cart/getallcartsItems`     | Get all Cart items   |

### 🔹 Orders Routes
| Method | Endpoint               | Description               |
|--------|------------------------|---------------------------|
| POST   | `/api/orders/checkout` | Checkout and create order |
| POST   | `/api/orders/:id/pay`  | Mark order as paid        |
| GET    | `/api/orders/allorder`          | Get all user orders       |
| GET    | `/api/orders/:id`      | Get specific order by ID  |

### 🔹 Admin Routes
| Method | Endpoint                       | Description         |
|--------|--------------------------------|---------------------|
| GET    | `/api/admin/orders`            | View all orders     |
| PATCH  | `/api/admin/orders/:id/status` | Update order status |

---

