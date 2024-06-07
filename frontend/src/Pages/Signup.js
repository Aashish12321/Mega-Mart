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
  const [showPassword, setShowPassword] = useState(1);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    profilePic: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: role.general
  });

  const handlePicUpload = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    console.log(imagePic);

    setUser((previousData) => {
      return {
        ...previousData,
        profilePic: imagePic
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
    e.preventDefault();   // prevent page refresh

    if (user.password !== user.confirmPassword){
      toast.error('Password and confirm password do not match');
    }
    else{
      const data = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        body: JSON.stringify(user),
        headers: {
          "content-type": "application/json",
        },
      });

      const userData = await data.json();

      if (userData.success){
        toast.success('User created successfully');
        console.log(userData);
        navigate('/login');
      }
      if (userData.error){
        toast.error(userData.message);
      }
    }
  };

  return (
    <section id="signup" className="shadow-white">
      <div className=" mx-auto container p-8">
        <form
          onSubmit={handleSignup}
          className="bg-gray-900 text-white p-2 max-w-md mx-auto rounded-md"
        >
          <div className="w-20 mx-auto mt-2 relative overflow-hidden rounded-full cursor-pointer">
            <img src={user.profilePic || logo} alt="logo" />
            <div className="text-xs bg-slate-200 text-black pb-4 pt-2 text-center bg-opacity-60 -mt-10">
              <input
                type="file"
                name="profilePic"
                id="fileInput"
                className="hidden"
                onChange={handlePicUpload}
              />
              <label htmlFor="fileInput">Upload</label>
            </div>
          </div>

          <div className="mt-4">
            Username:
            <div className="mb-2">
              <input
                type="text"
                name="username"
                placeholder=" Enter username..."
                className="w-full h-8 rounded-md outline-none text-black"
                value={user.username}
                onChange={handleOnchange}
                required
              />
            </div>
            Email:
            <div className="flex mb-2 bg-slate-100 w-full h-8 rounded-md ">
              <input
                type="email"
                name="email"
                placeholder=" Enter your email..."
                className="w-full h-8 outline-none bg-transparent text-black"
                value={user.email}
                onChange={handleOnchange}
                required
              />
            </div>

            Password:
            <div className="flex mb-2 bg-slate-100 w-full h-8 rounded-md items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder=" Enter password..."
                className="w-full h-8 outline-none bg-transparent text-black"
                value={user.password}
                onChange={handleOnchange}
                required
              />
              <div
                className="text-black mr-1 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span>{showPassword ? <IoEyeOff /> : <FaEye />}</span>
              </div>
            </div>
            Confirm Password:
            <div className="flex mb-2 bg-slate-100 w-full h-8 rounded-md items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder=" Enter confirm password..."
                className="w-full h-8 outline-none bg-transparent text-black"
                value={user.confirmPassword}
                onChange={handleOnchange}
                required
              />
              <div
                className="text-black mr-1 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span>{showPassword ? <IoEyeOff /> : <FaEye />}</span>
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="bg-red-500 w-28 h-8 rounded-2xl hover:bg-red-400"
              >
                SignUp
              </button>
            </div>
            <div className="text-sm mt-5">
              Already have account?
              <Link to={"/login"} className="text-red-500">
              &nbsp;&nbsp;Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
