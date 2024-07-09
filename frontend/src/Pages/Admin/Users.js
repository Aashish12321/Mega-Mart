import React, { useEffect, useState } from "react";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ChangeUserRole from "../../Components/ChangeUserRole";
import Spinner from "../../Components/Loaders/Spinner";

const Users = () => {
  const [allUser, setAllUser] = useState([]);
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [loader, setLoader] = useState(true);
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
      setLoader(false);
      // console.log(data.data[0]);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleUserSearch = async (e) => {
    const token = localStorage.getItem("token");
    if (searchKey && e.key === "Enter") {
      let response = await fetch(SummaryApi.search_user.url + `/${searchKey}`, {
        method: SummaryApi.search_user.method,
        headers: {
          "content-type": "application/json",
          authorization: `${token}`,
        },
      });

      let data = await response.json();
      data = data.data;
      if (data) {
        setAllUser(data);
      }
    } else {
      fetchAllUsers();
    }
  };

  return (
    <div className="allUser pt-2 px-2 ">
      <div className="text-center mb-2">
        <input
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={handleUserSearch}
          className="bg-gray-900 w-full md:max-w-lg rounded-full px-4 h-8 md:h-10 outline-none"
          type="text"
          placeholder="Search for the user..."
        />
      </div>

      <div className="h-[calc(100vh-100px)] overflow-auto rounded-lg">
        <table className="w-full border-collapse">
          <thead className="">
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
            {!allUser ? <Spinner /> :
              allUser.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{moment(user?.createdAt).format("lll")}</td>
                  <td className="flex justify-between">
                    <button
                      onClick={() => {
                        setUpdateEachUser(user);
                        setShowUpdateBox(true);
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
              ))}
          </tbody>
        </table>
      </div>

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

export default Users;
