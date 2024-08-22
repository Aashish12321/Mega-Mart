import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdDelete, MdEditSquare } from "react-icons/md";
import ChangeUserRole from "../../Components/ChangeUserRole";
import Spinner from "../../Components/Loaders/Spinner";

const Users = () => {
  const [allUser, setAllUser] = useState([]);
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [loader, setLoader] = useState(true);
  const token = localStorage.getItem("token");
  // const [isSearching, setIsSearching] = useState("false");
  const [updateEachUser, setUpdateEachUser] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
  });
  const fetchAllUsers = useCallback(async () => {
    let response = await fetch(SummaryApi.all_users.url, {
      method: SummaryApi.all_users.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });

    response = await response.json();
    if (response.success) {
      setAllUser(response?.data);
      setLoader(false);
    } else {
      toast.error(response.message);
    }
  }, [token]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleUserSearch = async (e) => {
    if (searchKey && e.key === "Enter") {
      let response = await fetch(SummaryApi.search_user.url + `/${searchKey}`, {
        method: SummaryApi.search_user.method,
        headers: {
          "content-type": "application/json",
          Authorization: `${token}`,
        },
      });

      response = await response.json();
      if (response.success) {
        setAllUser(response.data);
        setLoader(false);
      }
    } else {
      fetchAllUsers();
    }
  };

  return (
    <div className="allUser m-2 md:p-2">
      <div className="text-center mb-2">
        <input
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={handleUserSearch}
          className={`${searchKey && "border-zinc-400"} outline-none bg-zinc-800 w-full md:max-w-lg rounded-full px-4 h-10 border-2 border-transparent`}
          type="text"
          placeholder="Search for the user..."
        />
      </div>

      <div className="w-full rounded-lg overflow-x-auto">
        {loader ? (
          <Spinner />
        ) : (
          <table className="w-full bg-stone-800 rounded-xl">
            <thead className="w-full rounded-xl">
              <tr className="w-full md:text-lg text-gray-300">
                <th className="p-2">S.N.</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="w-full bg-stone-700">
              {allUser.map((user, index) => (
                <tr
                  key={user?._id}
                  className="select-none odd:bg-stone-700 even:bg-stone-500"
                >
                  <td className="p-2 text-center">{index + 1}.</td>
                  <td className="p-2 text-center">{user?.name}</td>
                  <td className="p-2 text-center">{user?.role}</td>
                  <td className="p-2 text-center">{user?.email}</td>
                  <td className="p-2 text-center">{moment(user?.createdAt).format("ll")}</td>
                  <td className="p-2 text-center flex justify-between gap-4">
                    <button
                      onClick={() => {
                        setUpdateEachUser(user);
                        setShowUpdateBox(true);
                      }}
                      className="text-green-400 text-2xl text-center mx-auto"
                    >
                      <MdEditSquare />
                    </button>
                    <button className="text-red-600 text-2xl text-center mx-auto">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        {showUpdateBox && (
          <ChangeUserRole
            updateEachUser={updateEachUser}
            onClose={() => setShowUpdateBox(false)}
            callFunc={fetchAllUsers}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
