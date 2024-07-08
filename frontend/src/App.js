import React, { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SummaryApi from "./Common";

import Context from "./Context";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react-redux
import { useDispatch } from "react-redux";
import { setUserDetails } from "./Store/userSlice";

const App = () => {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      headers: {
        authorization: `${token}`,
      },
    });
    
    const userData = await data.json();
    if (userData.success) {
      dispatch(setUserDetails(userData.data));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserDetails();
    }
  });

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
        </main>
        
        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
