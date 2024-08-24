import React, { useState } from "react";
import logo from "../Assets/loginIcon.gif";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { IoEyeOff } from "react-icons/io5";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import FloatingInput from "../Components/FloatingInput";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let response = await fetch(SummaryApi.login.url, {
      method: SummaryApi.login.method,
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });

    response = await response.json();
    const token = response.data;
    localStorage.setItem("token", token);

    if (response.success) {
      toast.success(response.message);
      const redirectTo =
        new URLSearchParams(location?.search).get("redirect") || "/";
      navigate(redirectTo);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center mt-20 px-3 text-white">
      <div className="w-full max-w-md bg-stone-700 shadow-custom p-3 rounded-lg">
        <img src={logo} alt="logo" className="w-16 mx-auto mt-2" />
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-2 mt-8"
        >
          <div className="w-full flex flex-col gap-6">
            <FloatingInput
              label="Email"
              type="email"
              user={user?.email}
              name="email"
              handleDataChange={handleOnchange}
            />
            <div className="flex w-full relative justify-end items-center rounded-md">
              <FloatingInput
                label="Password"
                type={showPassword ? "text" : "password"}
                user={user?.password}
                name="password"
                handleDataChange={handleOnchange}
              />
              <div
                className="absolute cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="flex items-center mr-2">{showPassword ? <GoEye /> : <IoEyeOff />}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to={"/reset-password"} className="text-md text-red-500 hover:text-gray-500">Forgot password?</Link>
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-red-500 w-28 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
            >
              Login
            </button>
          </div>
          <div className="text-sm mt-5">
            Don't have an account?
            <Link to={"/signup"} className="text-red-500">
              &nbsp;&nbsp;SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
