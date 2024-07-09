import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Admin from "./Pages/Admin/Admin";
import Users from "./Pages/Admin/Users";
import Dashboard from "./Pages/Admin/Dashboard";
import AddProduct from "./Pages/Admin/AddProduct";
import AllProducts from "./Pages/Admin/AllProducts";
import Categories from "./Components/CategoriesList";
import ProtectedRoute from "./ProtectedRoute";
import PermissionDenied from "./Pages/PermissionDenied";
import PageNotFound from "./PageNotFound";
import AdminEditProduct from "./Components/AdminEditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "*", 
        element: <PageNotFound />,
      },
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "signup",
        element: <ProtectedRoute><Signup /></ProtectedRoute>,
      },
      {
        path: "login",
        element: <ProtectedRoute><Login /></ProtectedRoute>,
      },
      {
        path: "forgot-password",
        element: <ProtectedRoute><ForgotPassword /></ProtectedRoute>,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "categories/:categoryName",
        element: <Categories />,
      },
      {
        path: "permission-denied",
        element: <PermissionDenied />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "edit-product",
            element: <AdminEditProduct />,
          },
        ],
      },
    ],
  },
]);

export default router;
