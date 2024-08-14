import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SummaryApi from "./Common";

import Context from "./Context";

import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react-redux
import { useDispatch } from "react-redux";
import { setUserDetails } from "./Store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartProductsCount, setCartProductsCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUserDetails = useCallback(async () => {
    let currentUserData = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    currentUserData = await currentUserData.json();
    if (currentUserData?.success) {
      dispatch(setUserDetails(currentUserData?.data));
    } else {
      if (currentUserData.message === "TokenExpiredError") {
        localStorage.removeItem("token");
        dispatch(setUserDetails(null));
        navigate("/login");
        toast.info("Session expired! Please login again");
      }
    }
  }, [dispatch, token, navigate]);

  const fetchCartProducts = useCallback(async () => {
    let response = await fetch(SummaryApi.view_cart.url, {
      method: SummaryApi.view_cart.method,
      headers: {
        authorization: `${token}`,
      },
    });
    response = await response.json();
    setCartProducts(response?.data?.cartProducts);
    // console.log(response?.data?.cartProducts);

    setCartProductsCount(response?.data?.count);
  }, [token]);

  const fetchFavouriteProducts = useCallback(async () => {
    let response = await fetch(SummaryApi.view_favourite.url, {
      method: SummaryApi.view_favourite.method,
      headers: {
        authorization: `${token}`,
      },
    });
    response = await response.json();
    setFavouriteProducts(response?.data?.favouriteProducts);
    // console.log(response?.data);

  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserDetails();
      fetchCartProducts();
      fetchFavouriteProducts();
    }else {
      setCartProducts([]);
      setCartProductsCount(0);
      setFavouriteProducts([]);
    }
  }, [
    fetchUserDetails,
    fetchCartProducts,
    fetchFavouriteProducts,
    token,
  ]);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          fetchCartProducts,
          fetchFavouriteProducts,
          cartProducts,
          favouriteProducts,
          cartProductsCount,
        }}
      >
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

        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </Context.Provider>
    </>
  );
};

export default App;
