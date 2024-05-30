import React, { useState } from "react";
import logo from "../Assets/loginIcon.gif";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import imageTobase64 from "../helpers/imageTobase64";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(1);
  const [profilePic, setProfilePic] = useState('');

  const handlePicUpload = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setProfilePic(imagePic);
  }

  return (
    <section id="signup" className="shadow-white">
      <div className="mx-auto container p-8">
        <div className="bg-gray-900 text-white p-2 max-w-md mx-auto">

          <div className="w-20 mx-auto mt-2 relative overflow-hidden rounded-full cursor-pointer">
            <img src={profilePic || logo} alt="logo"/>
            <div className="text-xs bg-slate-200 text-black pb-4 pt-2 text-center bg-opacity-60 -mt-10">
              <input type="file" id="fileInput" className="hidden" onChange={handlePicUpload}/>
              <label htmlFor="fileInput">Upload</label>
            </div>
          </div>
          
          <div className="mt-4">
            Name:
            <div className="mb-2">
              <input
                type="text"
                placeholder=" Enter your name..."
                className="w-full h-8 rounded-md outline-none text-black"
              />
            </div>
            Email:
            <div className="flex mb-2 bg-slate-100 w-full h-8 rounded-md ">
              <input
                type="email"
                placeholder=" Enter your email..."
                className="w-full h-8 outline-none bg-transparent text-black"
              />
            </div>
            Password:
            <div className="flex mb-2 bg-slate-100 w-full h-8 rounded-md items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" Enter password..."
                className="w-full h-8 outline-none bg-transparent text-black"
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
                placeholder=" Enter confirm password..."
                className="w-full h-8 outline-none bg-transparent text-black"
              />
              <div
                className="text-black mr-1 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span>{showPassword ? <IoEyeOff /> : <FaEye />}</span>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="bg-red-500 w-28 h-8 rounded-2xl hover:bg-red-400">
                SignUp
              </button>
            </div>
            <div className="text-sm mt-5">
              Already have account?
              <Link to={"/login"} className="text-red-500">
                {" "}
                Login{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
