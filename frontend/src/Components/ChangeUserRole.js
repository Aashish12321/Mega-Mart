import React, { useState } from "react";
import Role from "../Common/role";
import { FaRegWindowClose } from "react-icons/fa";
import SummaryApi from "../Common";
import { toast } from "react-toastify";

const ChangeUserRole = ({id, name, email, role, onClose, callFunc}) => {
  const [userRole, setUserRole] = useState(role);

  const updateUserRole = async () => {
    const token = localStorage.getItem('token');
    const userResponse = await fetch(SummaryApi.update_user.url, {
      method: SummaryApi.update_user.method,
      headers:{
        "content-type":"application/json",
        'authorization': `${token}`
      },
      body: JSON.stringify({id:id, name: name, email: email, role: userRole})
    })
    
    const userData = await userResponse.json();
    if (userData.success){
      toast.success(userData.message);
      callFunc();
      onClose();
    }
    if(userData.error){
      toast.error(userData.message);
      onClose();
    }
  }
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 bg-slate-300 bg-opacity-50 flex justify-between  items-center">
      <div className="mx-auto rounded-md bg-gray-600 shadow-md p-4 w-full max-w-sm">
        <button onClick={onClose} className="ml-auto block">
          <FaRegWindowClose />
        </button>
        <h1 className="pb-4 text-lg font-medium text-center">
          Change User Role
        </h1>
        <p>Name : {name}</p>
        <p>Email: {email}</p>
        <div className="flex items-center justify-between">
          <p>Role:</p>
          <select value={userRole} onChange={(e)=> setUserRole(e.target.value)} className="bg-gray-600 outline-none border px-4 py-1 rounded-full">
            {Object.values(Role).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={updateUserRole} className="bg-red-500 w-28 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all mx-auto block mt-2">
          Update
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
