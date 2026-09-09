# Full-Stack MERN Application

A full-stack web application built with **React.js, Node.js, Express.js, and MongoDB**. The project follows a separate frontend/backend architecture and includes authentication, API integration, file uploads, cloud storage, payment integration, and state management.

## 🚀 Tech Stack

### Frontend

* React.js 18
* Vite
* React Router
* Redux Toolkit
* React Redux
* React Hook Form
* Axios
* Tailwind CSS
* React Icons
* React Hot Toast / Sonner
* PayPal React SDK

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Multer
* Cloudinary
* CORS
* dotenv
* Streamifier

---

## 📁 Project Structure

```text
project-root/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── seeder.js
│   └── package.json
│
└── README.md
```

> The exact folder structure may vary depending on the implementation.

---

# ✨ Features

* User authentication and authorization
* JWT-based authentication
* Password hashing using bcrypt
* REST API integration
* MongoDB database integration
* Redux Toolkit for global state management
* React Router for client-side routing
* Form handling using React Hook Form
* File/image uploads using Multer
* Cloudinary integration for cloud-based image storage
* PayPal payment integration
* Toast notifications
* Responsive UI using Tailwind CSS
* API communication using Axios
* Environment variable configuration
* Database seeding support

---

# 🖥️ Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

### Frontend Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint to check the codebase.

---

# ⚙️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm start
```

For development with Nodemon:

```bash
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PAYPAL_CLIENT_ID=your_paypal_client_id
```

For the frontend, create a `.env` file if required:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

> Never commit `.env` files or API credentials to GitHub.

Add them to `.gitignore`:

```gitignore
.env
.env.local
.env.*.local
node_modules/
dist/
```

---

# 🔗 API Architecture

The frontend communicates with the backend through REST APIs.

Example Axios configuration:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
```

Typical request flow:

```text
React Component
       ↓
Redux / API Service
       ↓
Axios
       ↓
Express REST API
       ↓
Controller
       ↓
Mongoose
       ↓
MongoDB
```

---

# 🔑 Authentication Flow

The application uses JWT-based authentication.

```text
User Login
    ↓
React Frontend
    ↓
POST /api/auth/login
    ↓
Express Backend
    ↓
Validate User
    ↓
Verify Password
    ↓
Generate JWT
    ↓
Return Authentication Response
    ↓
Frontend Stores Authentication State
```

Protected APIs validate the JWT before allowing access to restricted resources.

---

# 🗄️ Database

The backend uses **MongoDB** with **Mongoose** for database operations.

Mongoose provides:

* Schema definition
* Data validation
* MongoDB queries
* Relationships/references
* Middleware
* Model-based database operations

Configure your MongoDB connection using:

```env
MONGO_URI=your_mongodb_connection_string
```

---

# ☁️ Cloudinary

Cloudinary is used for image/file storage.

The backend uses:

* `multer` for handling uploaded files
* `streamifier` for converting files into streams
* `cloudinary` for uploading and managing media

General upload flow:

```text
Frontend
   ↓
Multipart Form Data
   ↓
Multer
   ↓
Backend
   ↓
Cloudinary
   ↓
Cloudinary URL
   ↓
MongoDB
```

---

# 💳 PayPal Integration

The frontend uses:

```text
@paypal/react-paypal-js
```

to integrate PayPal payments.

Typical payment flow:

```text
User selects product
        ↓
Checkout
        ↓
PayPal
        ↓
Payment Authorization
        ↓
Backend Verification
        ↓
Order Confirmation
```

---

# 🌱 Database Seeding

The backend provides a seeding script for inserting initial/sample data.

Run:

```bash
npm run seed
```

Make sure your MongoDB connection is correctly configured before running the seeder.

---

# 🧪 Development

Run the frontend and backend separately.

### Terminal 1 — Frontend

```bash
cd frontend
npm install
npm run dev
```

### Terminal 2 — Backend

```bash
cd backend
npm install
npm run dev
```

---

# 📦 Main Dependencies

## Frontend

| Package          | Purpose                |
| ---------------- | ---------------------- |
| React            | UI development         |
| Vite             | Development/build tool |
| Redux Toolkit    | State management       |
| React Router     | Routing                |
| Axios            | HTTP requests          |
| React Hook Form  | Form management        |
| Tailwind CSS     | Styling                |
| PayPal React SDK | Payment integration    |

## Backend

| Package    | Purpose                   |
| ---------- | ------------------------- |
| Express    | REST API server           |
| Mongoose   | MongoDB ODM               |
| JWT        | Authentication            |
| bcryptjs   | Password hashing          |
| Multer     | File uploads              |
| Cloudinary | Cloud media storage       |
| CORS       | Cross-origin requests     |
| dotenv     | Environment configuration |
| Nodemon    | Development server        |

---

# 🔒 Security Considerations

* Store sensitive configuration in environment variables.
* Never commit `.env` files.
* Never expose database credentials.
* Use strong JWT secrets.
* Hash user passwords before storing them.
* Validate incoming API data.
* Protect private API routes with authentication middleware.
* Configure CORS appropriately for production.

---

# 🚀 Production Build

Build the frontend:

```bash
cd frontend
npm run build
```

The production files will be generated inside:

```text
frontend/dist/
```

The backend can then be deployed to a Node.js-compatible hosting platform.

---

# 🛠️ Future Improvements

* Add automated unit and integration tests
* Add API documentation using Swagger
* Implement refresh-token authentication
* Add centralized error handling
* Add request validation
* Improve logging
* Add CI/CD pipeline
* Add Docker support
* Add production monitoring
* Improve application performance

---

# 👨‍💻 Author

**Sahil Thakur**

Full-Stack / MERN Developer

### Skills

* React.js
* JavaScript
* Node.js
* Express.js
* MongoDB
* Mongoose
* Redux Toolkit
* REST APIs
* Tailwind CSS
* JWT Authentication
* Cloudinary
* Git & GitHub

---

# 📄 License

This project is intended for learning and development purposes.
