import React, { useEffect , useState} from 'react'
import SummaryApi from '../Common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import ChangeUserRole from '../Components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const fetchAllUsers = async() => {
      const response = await fetch(SummaryApi.all_users.url, {
        method: SummaryApi.all_users.method,
        headers: {
          "content-type": "application/json",
        },
        credentials: 'include'
      })

      const data = await response.json();
      if (data.success){
        setAllUser(data.data);
        // console.log(data.data[0]);
      }
      else{
        toast.error(data.message);
      }
  }


  useEffect(()=>{
    fetchAllUsers()
  })

  return (
    <div className='allUser px-3'>
      <table className='bg-gray-600 mt-3  w-full'>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((user, index)=>{
              return(
                <tr key={user._id}>
                  <td>{index+1}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{moment(user.createdAt).format('lll')}</td>
                  <td className='flex justify-between'>
                    <Link className='text-green-400 text-2xl text-center mx-auto'><FaRegEdit /></Link>  
                    <Link className='text-red-600 text-2xl text-center mx-auto'><MdDelete /></Link>  
                  </td>
                </tr>
              )
            }
            )
          }
        </tbody>
      </table>
      <ChangeUserRole />
    </div>
  )
}

export default AllUsers;
