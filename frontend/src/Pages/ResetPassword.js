import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FloatingInput from "../Components/FloatingInput";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import { GoEye } from "react-icons/go";
import { IoEyeOff } from "react-icons/io5";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const recoveryCode = searchParams.get("code");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    let response = await fetch(SummaryApi.reset_password.url, {
      method: SummaryApi.reset_password.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ recoveryCode, newPassword }),
    });
    response = await response.json();
    if (response.success) {
      toast.success(response.message);
      navigate("/login");
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center mt-20 px-3 text-white">
      <div className="w-full max-w-lg bg-stone-700 shadow-custom p-6 rounded-lg">
        <div className="w-full flex flex-col gap-4">
          <span className="text-xl xl:text-2xl font-semibold py-1 border-b-2 border-zinc-400">
            Change Your Password
          </span>
          <p className="text-sm block">
            Enter a new password below to change your password
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6 mt-8"
        >
          <div className="flex w-full relative justify-end items-center rounded-md">
            <FloatingInput
              label="New Password"
              type={showPassword ? "text" : "password"}
              user={newPassword}
              name="newPassword"
              handleDataChange={handleOnChange}
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
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              user={confirmPassword}
              name="confirmPassword"
              handleDataChange={handleOnChange}
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
          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-red-500 w-28 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
