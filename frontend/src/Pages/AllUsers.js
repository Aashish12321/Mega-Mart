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
  const [updateEachUser, setUpdateEachUser] = useState({
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
  });

  return (
    <div className="allUser px-3">
      <table className="bg-gray-600 mt-3 border-collapse border-green-400 w-full">
        <thead>
          <tr className="bg-gray-800">
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
                <td>{moment(user.createdAt).format("lll")}</td>
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
            name={updateEachUser.name}
            email={updateEachUser.email}
            role={updateEachUser.role}
            onClose={() => setShowUpdateBox(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;
