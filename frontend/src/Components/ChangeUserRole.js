import React from 'react'
import role from '../Common/role'
const ChangeUserRole = () => {
  return (
    <div className='fixed  top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center'>
        <div className='mx-auto rounded-md bg-gray-600 shadow-md p-4 w-full max-w-sm'>
            <h1 className='pb-4 text-lg font-medium text-center'> Change User Role</h1>
            <p>Name : Aashish</p>
            <p>Email: aashish@gmail.com</p>
            <div className='flex items-center justify-between'>
                <p>Role:</p>
                <select className='bg-gray-600 outline-none border px-4 py-1'>
                    {
                        Object.values(role).map(el => {
                            return (
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                </select>
            </div>
            <button className='bg-red-500 rounded-full p-1 relative mx-auto'>Update</button>
        </div>
    </div>
  )
}

export default ChangeUserRole;
