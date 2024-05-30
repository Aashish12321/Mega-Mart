import React, { useState } from "react";
import logo from "../Assets/loginIcon.gif";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [showPassword, setShowPassword] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();
    // console.log({email, password});
  }

  return (
    <section id="login" className="shadow-white">
      <div className="mx-auto container p-8">
        <div className="bg-gray-900 text-white p-2 max-w-md mx-auto">
          <img src={logo} alt="logo" className="w-16 mx-auto mt-2" />
          <form onSubmit={handleLogin} className="mt-4">
            Email:
            <div className="flex mb-2 bg-slate-100 w-full h-8 rounded-md ">
              <input
                type="email"
                placeholder=" Enter your email..."
                className="w-full h-8 outline-none bg-transparent text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            Password:
            <div className="flex mb-2 bg-slate-100 w-full h-8 rounded-md items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" Enter password..."
                className="w-full h-8 outline-none bg-transparent text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="text-black mr-1 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span>{showPassword ? <IoEyeOff /> : <FaEye />}</span>
              </div>
            </div>
            <div className="text-right text-sm text-red-500 hover:underline">
              <Link to={"/forgot-password"}>Forgot password?</Link>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="bg-red-500 w-28 h-8 rounded-2xl hover:bg-red-400">
                Login
              </button>
            </div>
            <div className="text-sm mt-5">
              Don't have an account ?
              <Link to={"/signup"} className="text-red-500 hover:underline">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
