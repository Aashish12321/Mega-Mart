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
        } else if (user?.role === "GENERAL") {
          navigate("/permission-denied");
          setLoader(false);
          return;
        }
        else{
          throw new Error("Error fetching user details. Please login again.");
        }
      } catch (err) {
        toast.error(err);
        return;
      }
    };

    if (!token && (currentRoute !== "/login" && currentRoute !== '/signup')) {
      navigate("/login");
      setLoader(false);
      toast.info('Login First');
    } else {
      if (token && (currentRoute === "/login" || currentRoute === "/signup")) {
        navigate("/");
        setLoader(false);
        toast.info("Already logged in");
      } else if (currentRoute.startsWith("/admin")) {
        checkAdmin();
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
