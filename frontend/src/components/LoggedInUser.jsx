import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cookies} from 'react'
import LogoutButton from './LogoutButton'

function LoggedInUser() {

    const [userPresent, SetUserPresent]= useState(false)
    
    const navigate = useNavigate()


    useEffect( ()=>{
        async function sendReq(){
          const browserCookies = document.cookie
        const Token = browserCookies.split(';')
        const accessTokenString=Token[0].split('=')
        const AccessToken = accessTokenString[1]
         
        const res = await fetch(`/api/v1/users/access-login`).then((e)=>{e.json(); SetUserPresent(true)}).catch((e)=>console.log('error:',e)
        )
        console.log('response:',res)
        
    }sendReq()
        
        
          
            

    },[])

    const loginPage = ()=>{
        navigate('/login')

    }
   

    

  return (
    userPresent?<>
      <div>
          Hello yash user is Present

          <div>
            to logout : <LogoutButton/>
          </div>
      </div></>:
    <>
       <div className='w-full text-white h-svh bg-purple-800 '> 

          <div className='w-full mt-20 text-2xl h-2/5 text-center flex items-center justify-center'>
           Session Expired ! Please Login Again.

          </div>

          <div className='w-full h-2/5 flex justify-center '>
              <button onClick={loginPage} className='w-1/6 text-3xl h-2/5 rounded-2xl bg-green-600 hover:shadow-2xl active:scale-75 transition-all hover:shadow-green-300'> LOGIN</button>
          </div>


       </div>
    </>
  )
}

export default LoggedInUser