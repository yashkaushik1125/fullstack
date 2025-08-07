import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
function SuccessRegister() {
  const location =useLocation()
  const myuser = location.state

  console.log(myuser.user);
  
  
  return (
    <div className='w-svw h-svh m-0 p-0  bg-black flex justify-center items-center'>
        <div className='text-4xl w-full text-purple-500 '>
            <div className='flex justify-center'>Succesfully Registered user : {myuser.user.message?.fullName}</div>
            <br />
            <br />
            <div className='flex justify-center'><NavLink to={'/login'} className='bg-green-600 text-xl w-2/5 text-center text-white items-center rounded-2xl'>LOGIN Here</NavLink></div>
        </div>
    </div>
  )
}

export default SuccessRegister