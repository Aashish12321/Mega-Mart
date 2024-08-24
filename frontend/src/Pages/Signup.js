import React, { useState } from "react";
import logo from "../Assets/loginIcon.gif";
import { Link, useNavigate } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { IoEyeOff } from "react-icons/io5";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import role from "../Common/role";
import FloatingInput from "../Components/FloatingInput";

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

    setUser((previousData) => {
      return {
        ...previousData,
        profilePic: imagePic,
      };
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast.info("Password and confirm password do not match");
    } else {
      const data = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        body: JSON.stringify({ user: user }),
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
    <div className="w-full flex flex-col items-center justify-center mt-8 px-3 text-white">
      <div className="w-full max-w-md bg-stone-700 shadow-custom p-3 rounded-lg">
        <form
          onSubmit={handleSignup}
          className="w-full flex flex-col gap-2 mt-2"
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

          <div className="w-full flex flex-col gap-6 mt-8">
            <FloatingInput
              label="Full Name"
              type="text"
              user={user?.name}
              name="name"
              handleDataChange={handleOnchange}
              required={true}
            />
            <FloatingInput
              label="Email"
              type="email"
              user={user?.email}
              name="email"
              handleDataChange={handleOnchange}
              required={true}
            />
            <FloatingInput
              label="Mobile Number"
              type="number"
              user={user?.mobileNumber}
              name="mobileNumber"
              handleDataChange={handleOnchange}
              required={true}
            />
            <div className="flex w-full relative justify-end items-center rounded-md">
              <FloatingInput
                label="Password"
                type={showPassword ? "text" : "password"}
                user={user?.password}
                name="password"
                handleDataChange={handleOnchange}
                required={true}
              />
              <div
                className="absolute cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="flex items-center mr-2">
                  {showPassword ? <GoEye /> : <IoEyeOff />}
                </span>
              </div>
            </div>
            <div className="flex w-full relative justify-end items-center rounded-md">
              <FloatingInput
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                user={user?.confirmPassword}
                name="confirmPassword"
                handleDataChange={handleOnchange}
                required={true}
              />
              <div
                className="absolute cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="flex items-center mr-2">
                  {showPassword ? <GoEye /> : <IoEyeOff />}
                </span>
              </div>
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
        </form>
      </div>
    </div>
  );
};

export default Signup;
