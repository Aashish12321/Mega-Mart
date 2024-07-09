import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom">
      <div className="text-center p-5 bg-customCard shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-red-500">404! 🙄</h1>
        <p className="mt-4 text-lg text-white">The page you're looking for cannot be found. Please check the URL path and try again! 😊</p>
        <button
          onClick={handleBackToHome}
          className="m-2 mt-4 text-white bg-red-500 w-32 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
