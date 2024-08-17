import React, { useState } from "react";
import logo from "../Assets/loginIcon.gif";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import role from "../Common/role";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    profilePic: "",
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: role.general,
  });

  const handlePicUpload = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    // console.log(imagePic);

    setUser((previousData) => {
      return {
        ...previousData,
        profilePic: imagePic,
      };
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setUser((previousData) => {
      return {
        ...previousData,
        [name]: value,
      };
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // prevent page refresh

    if (user.password !== user.confirmPassword) {
      toast.error("Password and confirm password do not match");
    } else {
      const data = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        body: JSON.stringify(user),
        headers: {
          "content-type": "application/json",
        },
      });

      const userData = await data.json();

      if (userData.success) {
        toast.success(userData.message);
        navigate("/login");
      }
      if (userData.error) {
        toast.error(userData.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="bg-stone-700 mt-20 text-white shadow-custom p-2 max-w-md mx-auto rounded-md "
    >
      <div className="w-20 mx-auto mt-2 overflow-hidden rounded-full cursor-pointer">
        <img src={user.profilePic || logo} alt="logo" />
        <div className="text-xs bg-slate-500 text-white pb-4 pt-2 text-center -mt-10">
          <input
            type="file"
            name="profilePic"
            id="fileInput"
            className="hidden overflow-auto"
            onChange={handlePicUpload}
          />
          <label htmlFor="fileInput">Upload</label>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="name">Name:</label>
        <div className="mb-2 bg-slate-100 rounded-md ">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter full name..."
            className="w-full h-8 pl-1 rounded-md outline-none bg-transparent text-black"
            value={user?.name}
            onChange={handleOnchange}
            required
          />
        </div>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <div className="mb-2 bg-slate-100 rounded-md ">
          <input
            type="number"
            name="mobileNumber"
            id="mobileNumber"
            placeholder="Eg: 9812345678"
            className="w-full h-8 pl-1 rounded-md outline-none bg-transparent text-black"
            value={user?.mobileNumber}
            onChange={handleOnchange}
            required
          />
        </div>
        <label htmlFor="email">Email:</label>
        <div className="mb-2 bg-slate-100 w-full rounded-md ">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email..."
            className="w-full h-8 pl-1 outline-none bg-transparent text-black"
            value={user?.email}
            onChange={handleOnchange}
            required
          />
        </div>
        <label htmlFor="password">Password:</label>
        <div className="flex mb-2 bg-slate-100 w-full h-8 rounded-md items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter password..."
            className="w-full h-8 pl-1 outline-none bg-transparent text-black"
            value={user?.password}
            onChange={handleOnchange}
            required
          />
          <div
            className="text-black mr-1 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span>{showPassword ? <FaEye /> : <IoEyeOff />}</span>
          </div>
        </div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <div className="flex mb-2 bg-slate-100 w-full h-8 rounded-md items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter confirm password..."
            className="w-full h-8 pl-1 outline-none bg-transparent text-black"
            value={user?.confirmPassword}
            onChange={handleOnchange}
            required
          />
          <div
            className="text-black mr-1 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span>{showPassword ? <FaEye /> : <IoEyeOff />}</span>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-red-500 w-28 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
          >
            SignUp
          </button>
        </div>
        <div className="text-sm mt-5">
          <span>Already have account?</span>
          <Link to={"/login"} className="text-red-500">
            &nbsp;&nbsp;Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;
