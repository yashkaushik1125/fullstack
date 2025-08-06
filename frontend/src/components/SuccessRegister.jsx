import React from 'react'

function SuccessRegister({user}) {
  return (
    <div className='w-svw h-svh m-0 p-0 flex justify-center items-center'>
        <div className='text-4xl text-purple-500 bg-green-300'>
            Succesfully Registered user : {user.message?.fullNAme}
        </div>
    </div>
  )
}

export default SuccessRegister