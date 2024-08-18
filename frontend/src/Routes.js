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
import Addcategory from "./Pages/Admin/Addcategory";
import ProductDetails from "./Pages/ProductDetails";
import AddBanner from "./Pages/Admin/AddBanner";
import Cart from "./Pages/Cart";
import Favourite from "./Pages/Favourite";
import AddReview from "./Pages/Reviews/AddReview";
import Checkout from "./Pages/Checkout";
import CreateCoupon from "./Pages/Admin/CreateCoupon";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import PaymentSuccess from "./Pages/PaymentSuccess";
import OrderDetails from "./Pages/OrderDetails";

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
        element: (
          <ProtectedRoute>
            <Signup />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "product/:pid/:vid",
        element: <ProductDetails />,
      },
      {
        path: "categories/:categoryName",
        element: <Categories />,
      },
      {
        path: "mycart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "myfavourite",
        element: (
          <ProtectedRoute>
            <Favourite />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:pid/:vid/add-review",
        element: (
          <ProtectedRoute>
            <AddReview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout/payment-success",
        element: (
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/view-order",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
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
            path: "add-category",
            element: <Addcategory />,
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
            path: "/admin/product/:pid/edit",
            element: <UpdateProduct />,
          },
          {
            path: "add-banner",
            element: <AddBanner />,
          },
          {
            path: "create-coupon",
            element: <CreateCoupon />,
          },
        ],
      },
    ],
  },
]);

export default router;
