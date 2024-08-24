import React, { useState } from "react";
import FloatingInput from "../Components/FloatingInput";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../Common";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    let response = await fetch(SummaryApi.reset_password.url, {
      method: SummaryApi.reset_password.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    response = await response.json();
    if (response.success){
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
          <span className="text-xl xl:text-2xl font-semibold border-b-2 border-zinc-400">
            Reset Password
          </span>
          <p className="text-sm block">
            Enter the email address you used when you joined and we'll send you
            password reset code to reset your password. <br />
            <br /> For security reasons, we do NOT store your password. So, rest
            assured that we will never send your password via email.
          </p>
        </div>
        <form
          onSubmit={handleResetPassword}
          className="w-full flex flex-col gap-2 mt-8"
        >
          <div className="w-full flex flex-col gap-6">
            <FloatingInput
              label="Email"
              type="email"
              user={email}
              name="email"
              handleDataChange={handleOnChange}
              required={true}
            />
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-red-500 w-28 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
            >
              Reset
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

export default ResetPassword;
