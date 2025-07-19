# 🛍️ E-Commerce Store

A full-stack e-commerce web application built with the MERN stack, featuring product browsing, user authentication, admin dashboard, PayPal payment integration, and more.

---

## 🚀 Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT & bcrypt.js (Authentication)
- Multer + Cloudinary (Image Uploads)
- PayPal REST SDK
- dotenv (Environment Configuration)

**Frontend:**
- React 19 + Vite
- Redux Toolkit
- Tailwind CSS + Flowbite
- Axios + React Router v6
- React Toastify (Notifications)
- ApexCharts (Analytics)
- React Slick (Carousels)
- PayPal React SDK

---

## ✨ Features

### 👤 User Features
- JWT-based registration & login
- View & update profile
- Add/remove products to favorites ❤️
- Add/remove items from cart 🛒
- Filter products by price & category
- Search bar for quick discovery
- Checkout via PayPal
- View order history

### 🛠️ Admin Features
- Login as admin
- Dashboard with user/product/order stats
- Create, edit, delete categories & products
- View all users and orders
- Track and update order status
- Chart analytics for performance

---

## 📦 Project Structure

e-commerce-store/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── index.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── redux/
│ │ ├── utils/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/
│ ├── index.html
│ ├── vite.config.js
│ └── package.json
└── README.md

yaml
Copy
Edit

---

## ⚙️ Backend Setup

```bash
# 1. Navigate to backend folder:
cd backend

# 2. Install dependencies:
npm install

# 3. Create a .env file inside /backend:
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_api_key
CLOUDINARY_API_SECRET=your_cloud_api_secret

# 4. Make Changes
- Inside file: index.js: comment "origin: "https://e-commerce-store-nu-six.vercel.app"," and uncomment: "eorigin: "*","

# 5. Run the backend server:
npm run dev


## 💻 Frontend Setup
bash
Copy
Edit
# 1. Navigate to frontend folder:
cd frontend

# 2. Install dependencies:
npm install

# 3. Changes to be made:
- Inside file: vite.config.js: uncomment "server: {
    proxy: {
     '/api/': "http://localhost:3000",
    '/uploads/': "http://localhost:3000",
    }
   }"

- Inside file: constants.js: comment "export const BASE_URL = 'https://e-commerce-store-6z26.onrender.com'" and uncomment: "export const BASE_URL = ''"

# 4. Run the frontend app:
npm run dev
## 🌐 Deployment
Frontend: Vercel or Netlify

Backend: Render, Railway, or any VPS

Ensure environment variables are set in hosting dashboards

CORS configured to allow frontend domain

## 🔐 Environment Variables Summary
Variable	Description
PORT	Server port (default: 3000)
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for JWT
PAYPAL_CLIENT_ID	PayPal client ID
CLOUDINARY_CLOUD_NAME	Cloudinary cloud name
CLOUDINARY_API_KEY	Cloudinary API key
CLOUDINARY_API_SECRET	Cloudinary API secret
VITE_API_BASE_URL	Frontend URL to backend API

## 🧠 Key Concepts
Redux Toolkit for managing auth, cart, favorites

Axios with interceptors for secure API requests

Protected routes using JWT middleware

Multer + Cloudinary for image handling

PayPal integration with React SDK

Fully responsive UI with Tailwind CSS

Admin dashboard with chart-based analytics

## 📈 Analytics
Admin dashboard includes:

Sales, orders, and revenue charts

Bar & line graphs using ApexCharts

Track user growth and order trends