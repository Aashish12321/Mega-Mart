import React from "react";
import FloatingInput from "../../Components/FloatingInput";
import { useSelector } from "react-redux";
import { selectUser } from "../../Store/selector";

const Account = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <div className="m-1 p-1 md:m-2 md:p-2 rounded-lg">
        <div className="px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full">
          <span className="text-xl font-bold">Your Account Details</span>
        </div>

        <div className="w-full flex flex-col px-4 py-8 bg-stone-700 rounded-xl border-2 border-zinc-400">
          <div className="flex space-x-4">
            <FloatingInput label="First name" />
            <FloatingInput label="Middle name" />
            <FloatingInput label="Last name" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
