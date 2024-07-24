import React, { useCallback, useEffect } from "react";
import "./App.css";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SummaryApi from "./Common";

import Context from "./Context";

import { Bounce,toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react-redux
import { useDispatch } from "react-redux";
import { setUserDetails } from "./Store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUserDetails = useCallback(async () => {
    let currentUserData = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      headers: {
        authorization: `${token}`,
      },
    });

    currentUserData = await currentUserData.json();
    if (currentUserData.success) {
      dispatch(setUserDetails(currentUserData.data));
    }
    else{
      if(currentUserData.message === 'TokenExpiredError'){
        localStorage.removeItem('token');
        dispatch(setUserDetails(null));
        navigate('/login');
        toast.info('Session expired! Please login again');
      }
    }
  },[dispatch, token, navigate]);

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  },[fetchUserDetails, token]);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer
          hideProgressBar
          draggable
          draggableDirection="x"
          position="top-center"
          autoClose={1500}
          transition={Bounce}
          limit={2}
          theme="dark"
          // style={{transition: 'ease-in-out'}}
        />

        <Header />

        <main className="h-[100vh] min-[320px]:mt-16 min-[1024px]:mt-16 min-[1440px]:mt-16 border-2 border-transparent">
          <Outlet />
          <Footer />
        </main>
        

      </Context.Provider>
    </>
  );
};

export default App;
