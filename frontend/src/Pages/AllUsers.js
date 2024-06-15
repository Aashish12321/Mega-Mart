import React, { useEffect, useState } from "react";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ChangeUserRole from "../Components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [updateEachUser, setUpdateEachUser] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
  });
  const fetchAllUsers = async () => {
    const response = await fetch(SummaryApi.all_users.url, {
      method: SummaryApi.all_users.method,
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    if (data.success) {
      setAllUser(data.data);
      // console.log(data.data[0]);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  },[]);

  const handleUserSearch = async (key) => {
    let response = await fetch(`http://localhost:7000/api/search-user/${key}`, {
      method: 'get',
      headers: {
        "content-type": "application/json",
      },
      credentials: 'include'
    })

    const data = await response.json();
    console.log(data.data);


    if (data){
      setAllUser(data.data);
    }
    else {
      setAllUser([]);
      // fetchAllUsers();
    }

    
  }

  return (
    <div className="mt-2 allUser px-2">
      <div className="relative flex justify-between">
        <input onChange={(e)=> handleUserSearch(e.target.value)} className="bg-gray-900 w-72 rounded-full px-4 h-10 outline-none " type="text" placeholder="Search for the user..." />
        <div onClick={()=> setShowMenu(!showMenu)} className="mt-2 absolute cursor-pointer right-0 border-2 border-black hover:bg-red-500  rounded-xl inline-table w-28  text-center px-0">
          <div>All users</div>
          {
            showMenu && (
              <ul className="pt-2 w-28 bg-red-500 rounded-b-lg">
                <li className="border-t cursor-pointer">All</li>
                <li className="border-t cursor-pointer">Admin</li>
                <li className="border-t cursor-pointer">General</li>
              </ul>
            )
          }
        </div>
      </div>
      
      <table className="mt-2 border-collapse w-full">
        <thead className="rounded-md">
          <tr className="bg-gray-900">
            <th>S.N.</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((user, index) => {
            return (
                <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{moment(user?.createdAt).format("lll")}</td>
                <td className="flex justify-between">
                  <button
                    onClick={() => {
                      setUpdateEachUser(user)
                      setShowUpdateBox(true)
                    }}
                    className="text-green-400 text-2xl text-center mx-auto"
                  >
                    <FaRegEdit />
                  </button>
                  <button className="text-red-600 text-2xl text-center mx-auto">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {showUpdateBox && (
          <ChangeUserRole
            id={updateEachUser._id}
            name={updateEachUser.name}
            email={updateEachUser.email}
            role={updateEachUser.role}
            onClose={() => setShowUpdateBox(false)}
            callFunc={fetchAllUsers}
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;
