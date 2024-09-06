import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Components/Loaders/Spinner";
import { toast } from "react-toastify";
import { selectUser } from "./Store/selector";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  var user = useSelector(selectUser);
  const [loader, setLoader] = useState(true);
  var currentRoute = useLocation().pathname;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const checkAdmin = async () => {
      try {
        if (user?.role === "ADMIN") {
          setLoader(false);
          return;
        } else if (user?.role === "VENDOR") {
          if (
            currentRoute === "/admin/users" ||
            currentRoute === "/admin/create-coupon"
          ) {
            navigate("/permission-denied");
            setLoader(false);
            return;
          }
          setLoader(false);
          return;
        } else if (user?.role === "GENERAL") {
          navigate("/permission-denied");
          setLoader(false);
          return;
        }
      } catch (err) {
        toast.error(err);
      }
    };

    if (!token) {
      if (currentRoute === "/login" || currentRoute === "/signup") {
        setLoader(false);
      } else {
        navigate(`/login?redirect=${currentRoute}`);
        setLoader(false);
        toast.info("Please login to continue");
      }
    } else {
      if (currentRoute.startsWith("/admin")) {
        checkAdmin();
      } else if (currentRoute === "/login" || currentRoute === "/signup") {
        navigate("/");
        setLoader(false);
        toast.info("Already logged in");
      } else {
        setLoader(false);
      }
    }
  }, [user, navigate, loader, currentRoute]);

  if (loader) {
    return <Spinner />;
  }
  return children;
};

export default ProtectedRoute;
