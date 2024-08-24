import React, { useEffect, useState } from "react";
import FloatingInput from "../../Components/FloatingInput";
import { useSelector } from "react-redux";
import { selectUser } from "../../Store/selector";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const genders = [
  { label: "Male", icon: "♂" },
  { label: "Female", icon: "♀" },
];

const Account = () => {
  const currentUser = useSelector(selectUser);
  const token = localStorage.getItem("token");
  const [updatedUser, setUpdatedUser] = useState({});
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUpdatedUser({ ...currentUser, gender: currentUser?.gender || "Male" });
    }
  }, [currentUser]);

  useEffect(() => {
    if (JSON.stringify(currentUser) === JSON.stringify(updatedUser)) {
      setIsChange(false);
    }
  }, [currentUser, updatedUser]);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setIsChange(true);
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();

    let response = await fetch(SummaryApi.update_user.url, {
      method: SummaryApi.update_user.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({ updatedUser: updatedUser }),
    });
    response = await response.json();
    if (response.success) {
      toast.success(response.message);
      navigate("/profile/cart");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={updateUserDetails}
        className="m-1 p-1 md:m-2 md:p-2 rounded-lg"
      >
        <div className="px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full">
          <span className="text-xl font-bold">Your Account Details</span>
        </div>

        <div className="w-full flex flex-col gap-8 px-4 py-4 bg-stone-700 rounded-xl border-2 border-zinc-400">
          <span className="text-lg font-semibold border-b-2 border-zinc-400">
            Personal Information
          </span>
          <div className="w-full">
            <FloatingInput
              label="Full Name"
              user={updatedUser?.name}
              name="name"
              handleDataChange={handleDataChange}
              required={true}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row gap-8">
            <FloatingInput
              label="Email"
              type="email"
              user={updatedUser?.email}
              name="email"
              handleDataChange={handleDataChange}
              disabled={true}
              required={true}
            />
            <FloatingInput
              label="Mobile Number"
              type="number"
              user={updatedUser?.mobileNumber}
              name="mobileNumber"
              handleDataChange={handleDataChange}
              required={true}
            />
          </div>
          <div className="w-full">
            <FloatingInput
              label="Date of Birth"
              type="Date"
              user={updatedUser?.dob}
              name="dob"
              handleDataChange={handleDataChange}
            />
          </div>

          <div className="flex gap-6">
            {genders.map((gender) => (
              <div
                key={gender.label}
                className={`relative w-24 h-24 flex flex-col items-center justify-center rounded-lg cursor-pointer border-2 transition-all ${
                  updatedUser?.gender === gender.label
                    ? "bg-green-600 text-white"
                    : "bg-white text-green-500"
                }`}
                onClick={() =>
                  setUpdatedUser({ ...updatedUser, gender: gender.label })
                }
              >
                <div className="text-3xl">{gender.icon}</div>
                <div className="mt-2 text-lg">{gender.label}</div>
                {updatedUser?.gender === gender.label && (
                  <div className="absolute top-0 right-1 text-xl">✔</div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-12 text-center">
            <button
              type="submit"
              className={`${
                isChange
                  ? "bg-red-500 active:shadow-none active:translate-y-0.5"
                  : "opacity-40 bg-red-400"
              } w-28 h-10 text-lg rounded-lg shadow-sm shadow-white transition-all`}
              disabled={!isChange}
            >
              Save
            </button>
            <button
              onClick={() => navigate("/profile/cart")}
              className="bg-gray-400 w-28 h-10 text-lg rounded-lg shadow-sm shadow-white active:shadow-none transition-all active:translate-y-0.5"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Account;
