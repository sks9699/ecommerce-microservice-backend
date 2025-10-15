# 🛒 E-Commerce Backend API

A robust and modular **E-Commerce Backend API** built using **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
This project includes **JWT authentication**, **role-based access control (Admin/User)**, and **transactional checkout** with real-time stock management.

---

## 🚀 Features

- **User Authentication (JWT)**
  - Login & Register with secure password hashing  
  - Role-based authorization (Admin/User)

- **Admin Privileges**
  - Create, Update, Delete Products  
  - View all orders  

- **Products Module**
  - Add, edit, or remove products  
  - Stock management with `available` and `reserved` fields  

- **Cart & Checkout**
  - Add items to cart  
  - Checkout process with MongoDB transactions  
  - Auto-reserve stock on checkout  

- **Error Handling**
  - Centralized error response structure  
  - Validation with meaningful messages  

- **Secure Architecture**
  - JWT-based authentication  
  - Protected routes with middleware  
  - Admin-only access control  

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose |
| **Auth** | JSON Web Token (JWT) |
| **Validation** | Joi |
| **ORM** | Mongoose |
| **Language** | JavaScript (ES6) |

---

## 📁 Project Structure

