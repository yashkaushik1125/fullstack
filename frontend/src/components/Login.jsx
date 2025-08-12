import React , {use, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import LogoutButton from './LogoutButton'
import {ClipLoader} from 'react-spinners'

function Login() {
  
      let response
      const [user,setUser] = useState({})
      const [message,setMessage]= useState('')
      const [loading,setLoading]=useState(false)
      const [formData, setFormData] = useState({
        email: '',
        password: '',
        username:'',
      });
    
      useEffect(()=>{
        if(user)
        {
          if(user.status>=500)window.alert(user.message)
          if(user.success==false)window.alert(user.message)
          if(user.success==true)window.alert(user.data)
        }
      },[user])

    const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('username',formData.username)
   const stringData=formData.toLocaleString()

    try {
      const response = await fetch(`${process.env.LOGIN_USER}/api/v1/users/login`, {
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(formData),
        credentials:'include'
      }).then((res)=>res.json())
      .then((res)=>setUser(res))
      
      
      
      
    } catch (error) {
      console.error('Upload Error:', error);
    }
    finally{
      setLoading(false)
      console.log('user',user);
      
      
      
    }
    
  }
  

  return (
    <div className='bg flex justify-center'>
      <div className='w-2/5 h-3/5 bg-transparent shadow-2xl shadow-black  items-center self-center'>

      <form className=' h-full w-full relative'  method='POST'>
      <div className='flex w-full h-3/5 '>
        <div className='w-1/2 mt-10  inline self-center justify-center text-center'>
          <label htmlFor="email">Email:</label><br />
          <label htmlFor="username">Username:</label><br />
          <label htmlFor="password">Password</label><br />
        </div>
        <div className='w-1/2  items-center inline  self-center text-start justify-center self-center'>
        <input type="email"
           name="email" 
           value={formData.email}
           onChange={handleChange}
           required='true'
        /><br />
        <input type="text" 
           name='username'
           className='  inline-block'
           value={formData.username}
           onChange={handleChange}
           required='true'/><br />
        <input 
        type="password" 
        name="password" 
        value={formData.password}
        onChange={handleChange}
        required='true'/><br />

        </div><br />

      </div>
        
      <div className='w-full text-center'>        
        <button type="submit"  className=' w-full  flex justify-center  text-center text-white rounded-sm' onClick={handleSubmit}>
         <div className='w-2/6 rounded-sm flex justify-center bg-green-700'>
           {loading?
          <ClipLoader/>
          :'Submit'}
         </div>
         </button>
     </div>
     <div className='absolute bottom-0 flex  w-full ' >
 <div className='flex max-w-1/2 text-sm'>
       New User? &nbsp; <div className=' w-2/5 text-center bg-purple-600 rounded-md'><NavLink to={'/'} className=' text-white w-full p-3 '>Register Here</NavLink></div>
 </div>
 <div className='w-1/2 flex justify-end'>
  {user?.message?.email?<LogoutButton setUser={setUser}/>:''}
 </div>
     </div>
      </form>
      
      </div>

    </div>
  )
}

export default Login