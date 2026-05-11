import { createBrowserRouter } from "react-router-dom";

// USER ROUTES
import About from "../pages/user/About";
import Home from "../pages/user/Home";
import UserLayout from "../component/Layout/UserLayout";

// ADMIN ROUTES
import AdminLayout from "../component/Layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Orders from "../pages/admin/Orders";

// AUTH ROUTE
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/user/Profile";
import CollectionPage from "../pages/user/CollectionPage";
import ProductDetails from "../component/Products/ProductDetails";
import CheckOut from "../component/Cart/CheckOut";
import OrderConfirmationPage from "../pages/user/OrderConfirmationPage";
import OrderDetailsPage from "../pages/user/OrderDetailsPage";
import MyOrdersPage from "../pages/user/MyOrdersPage";
import AdminPannel from "../pages/admin/AdminPannel";
import AdminHomePage from "../pages/admin/AdminHomePage";
import UserManagement from "../component/Admin/UserManagement";
import ProductManagement2 from "../component/Admin/ProductManagement2";
import EditProductPage from "../component/Admin/EditProductPage";
import ProtectedRoute from "../component/CommonUI/ProtectedRoute";


export const router = createBrowserRouter([
  // 🔐 LOGIN ROUTE
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // USER ROUTES
  {
    path: "/",
    element: <UserLayout />, // oulet
    children: [
      { index: true, element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/collection/:collection", element: <CollectionPage /> },
      { path: "/about", element: <About /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/checkout", element: <CheckOut /> },
      { path: "/order-confirmation", element: <OrderConfirmationPage /> },
      { path: "/order/:id", element: <OrderDetailsPage /> },
      { path: "/my-orders", element: <MyOrdersPage /> },
    ],
  },

  // ADMIN ROUTES
  {
    path: "/admin",
     element: (
    <ProtectedRoute role="admin">
      <AdminLayout />
    </ProtectedRoute>
  ),
    children: [
      {
        path: "/admin",
        element: <AdminPannel />,
        children: [
          { index: true, element: <AdminHomePage /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "orders", element: <Orders /> },
          { path: "products", element: <ProductManagement2 /> },
          { path: "products/:id/edit", element: <EditProductPage /> },
          { path: "users", element: <UserManagement /> },

        ],
      },
    ],
  },
]);
