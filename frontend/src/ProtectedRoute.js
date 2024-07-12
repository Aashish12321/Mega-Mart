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
        if (user?.role === "ADMIN" || user?.role === "VENDOR") {
          setLoader(false);
          return;
        } else if (user?.role === "GENERAL") {
          navigate("/permission-denied");
          setLoader(false);
          return;
        }
        // else {
        //   throw new Error('Token expired admin, Please login again');
        // }
      } catch (err) {
        // localStorage.removeItem("token");
        // navigate('/login');
        // toast.error(err.message);
        // return;
      }
    };

    if (!token) {
      if (currentRoute === "/login" || currentRoute === "/signup") {
        setLoader(false);
      } else {
        navigate("/login");
        setLoader(false);
        toast.info("Login First");
      }
    } else {
      if (currentRoute.startsWith("/admin")) {
        checkAdmin();
      } else if (currentRoute === "/login" || currentRoute === "/signup") {
        navigate("/");
        setLoader(false);
        toast.info("Already logged in");
      } else {
        // checkGeneral();
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
