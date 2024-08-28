import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
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
import Cart from "./Pages/Customer/Cart";
import Favourite from "./Pages/Customer/Favourite";
import AddReview from "./Pages/Reviews/AddReview";
import Checkout from "./Pages/Checkout";
import CreateCoupon from "./Pages/Admin/CreateCoupon";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import PaymentSuccess from "./Pages/PaymentSuccess";
import OrderDetails from "./Pages/Customer/OrderDetails";
import Profile from "./Pages/Customer/Profile";
import CustomerAllOrders from "./Pages/Customer/CustomerAllOrders";
import Account from "./Pages/Customer/Account";
import AllOrders from "./Pages/Admin/AllOrders";
import SuborderDetails from "./Pages/Admin/SuborderDetails";
import Suborders from "./Pages/Admin/Suborders";

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
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
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
        path: "permission-denied",
        element: <PermissionDenied />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "favourites",
            element: <Favourite />,
          },
          {
            path: "orders",
            element: <CustomerAllOrders />,
          },
          {
            path: "orders/order/:orderId/details",
            element: <OrderDetails />,
          },
        ],
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
          {
            path: "all-orders",
            element: <AllOrders />,
          },
          {
            path: "all-orders/suborder/:suborderId",
            element: <SuborderDetails />,
          },
          {
            path: "all-orders/:orderId/suborders",
            element: <Suborders />,
          },
          {
            path: "all-orders/:orderId/suborders/:suborderId/details",
            element: <SuborderDetails />,
          },
          {
            path: "all-orders/:orderId/details",
            element: <OrderDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
