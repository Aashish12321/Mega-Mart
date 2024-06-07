import React, { useState } from 'react'
import SummaryApi from '../Common';

const AllUsers = async () => {
  const [allUsers, setAllUsers] = useState([]);
  const fetchAllUsers = async() => {
    let data = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      credentials: 'include'
    })

    data = await data.json();
  }
  return (
    <div>
      All users
    </div>
  )
}

export default AllUsers;
