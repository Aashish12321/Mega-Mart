import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Context from "./Context";
import Spinner from "./Components/Loaders/Spinner";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { fetchUserDetails } = useContext(Context);
  const [loader, setLoader] = useState(true);
  var currentRoute = useLocation().pathname;

  useEffect(() => {
    const checkGeneralUser = () => {
      const token = localStorage.getItem("token");
      setLoader(false);
      if (!token) {
        navigate("/login");
        toast.info("Login first");
        return;
      } else {
        return children;
      }
    };

    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        toast.error("Login first");
        return;
      }

      await fetchUserDetails();
      if (user?.role === "ADMIN") {
        setLoader(false);
        return;
      } else if (user?.role === "GENERAL") {
        navigate("/permission-denied");
        return;
      }
    };

    if (currentRoute.startsWith("/admin")) {
      checkAdmin();
    } else {
      checkGeneralUser();
    }
  }, [fetchUserDetails, navigate, loader, user, children, currentRoute]);

  if (loader) {
    return <Spinner />;
  }

  return children;
};

export default ProtectedRoute;
