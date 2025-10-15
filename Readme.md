Perfect 👍 — here’s your **final, complete `README.md`** with a detailed **project structure diagram** included.
This version also keeps a **professional tone** and is ideal for GitHub or submission use.

---

```markdown
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
- JOI schema-based validation for incoming data  

✅ **Clean Project Structure**  
- Separated controllers, routes, and services  
- Reusable middleware for auth and role checks  

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose |
| **Auth** | JSON Web Token (JWT) |
| **Validation** | Joi |
| **Language** | JavaScript (ES6) |

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
├── .gitignore
├── package.json
├── README.md
└── server.js                          # Entry point of the app

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/ecommerce-backend.git
cd ecommerce-backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

If not using hardcoded values, create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the Application

```bash
npm start
```

Server will start at:
👉 **[http://localhost:3000](http://localhost:5000)**

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
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login & get token |

---

### 🔹 Product Routes (Admin Only)

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | `/api/products`     | Create new product |
| GET    | `/api/products`     | Get all products   |
| PUT    | `/api/products/:id` | Update product     |
| DELETE | `/api/products/:id` | Delete product     |

---

### 🔹 Cart Routes

| Method | Endpoint                     | Description             |
| ------ | ---------------------------- | ----------------------- |
| GET    | `/api/cart`                  | View cart               |
| POST   | `/api/cart/items`            | Add or update cart item |
| DELETE | `/api/cart/items/:productId` | Remove item from cart   |

---

### 🔹 Orders Routes

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | `/api/orders/checkout` | Checkout and create order |
| POST   | `/api/orders/:id/pay`  | Mark order as paid        |
| GET    | `/api/orders`          | Get all user orders       |
| GET    | `/api/orders/:id`      | Get specific order by ID  |

---

### 🔹 Admin Routes

| Method | Endpoint                       | Description         |
| ------ | ------------------------------ | ------------------- |
| GET    | `/api/admin/orders`            | View all orders     |
| PATCH  | `/api/admin/orders/:id/status` | Update order status |

---

## 🧾 Example Request

### Create Product (Admin)

```bash
curl --location --request POST 'http://localhost:5000/api/products' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <your_token>' \
--data-raw '{
  "name": "iPhone 16 Pro",
  "description": "Apple flagship phone",
  "price": 1299,
  "stock": {
    "available": 100,
    "reserved": 0
  }
}'
```

---

## 📦 Sample Output

```json
{
  "statusCode": 200,
  "data": {
    "_id": "671f8d0f9a1b5b8cd937b60d",
    "name": "iPhone 16 Pro",
    "price": 1299,
    "stock": { "available": 100, "reserved": 0 },
    "status": 1
  },
  "message": "Product created successfully"
}
```

---

## 👨‍💻 Author

**Sonu (He/Him)**
Junior Software Engineer @ Immense Prescient LLP
📧 [kushalrana448@gmail.com](mailto:kushalrana448@gmail.com)
💼 [LinkedIn](https://linkedin.com/in/sonu)
💻 [GitHub](https://github.com/<your-username>)

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🏁 Summary

This project demonstrates a **complete Node.js backend solution** for an e-commerce platform, covering:

* Secure user authentication
* Role-based route protection
* Transactional checkout
* Clean modular codebase

It’s designed for scalability, readability, and maintainability — ideal for **production-ready APIs** or **portfolio demonstration**.

```

---

Would you like me to also generate a **`Postman Collection (JSON)`** file for all endpoints?  
That would let you **import all routes instantly into Postman** and test without retyping any URL.
```
