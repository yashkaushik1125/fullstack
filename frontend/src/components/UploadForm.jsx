import React, { useEffect, useState } from 'react';
import bg from '../assets/bg.png'
import logo from '../assets/logo.png'
import { useNavigate ,NavLink , Link } from 'react-router-dom';

import {ClipLoader} from 'react-spinners'

const UploadForm = () => {
  const [user,setUser] = useState()
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    username:'',
  });





  const [coverImage, setCoverImage] = useState(null);
  const [avtar, setAvtar] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };



  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'coverImage') {
      setCoverImage(files[0]);
    } else if (name === 'avtar') {
      setAvtar(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('username',formData.username)
    data.append('coverImage', coverImage);
    data.append('avtar', avtar);
    console.log(data);
    

    try {
      const response = await fetch(`${process.env.REGISTER_USER}/api/v1/users/register`, {
        method: 'POST',
        body: data,
      }).then((res)=>res.json())
      .then((e)=>{setUser(e);setLoading(false);})
      .catch((error)=>console.log(error))
      
    } catch (error) {
      console.error('Upload Error:', error);
    }
    finally{
      console.log(user);
      
      if(user.status>=500)
        alert('internal server error')
      else if(user.status==200)
        alert(user.message)
      else if(user.success==true)
        alert(user.data)
      else if(user.success==false)
        alert(user.message)
    }
  }
 



  return (
   <div>
         <div className="bg">
           <div className="center">
               <div className="inner-img">
                    <img src={logo}/>
               </div>
   
               <form className="form"  method='POST'>

          <div className='flex w-full mb-12 '>
             <div className='w-2/6 '>
                 <label>Full Name:</label>   
              </div>    
              <div className='h-full w-full  flex justify-center '>
                 <input
                 className=''
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                 />
              </div>
            </div>
         
          <div className='flex w-full mb-120'>
           <div className='w-2/6'> <label>Email:</label></div>
        <div className='h-full w-full  flex justify-center '> <input
           type="email"
           name="email"
           
           value={formData.email}
           onChange={handleChange}
           required
         /></div>
            </div>
         
         <div className='flex w-full mb-12'>
           <div className='w-2/6'> <label>Username:</label></div>
         <div className='h-full w-full  flex justify-center '><input
           type="text"
           name="username"
           
           value={formData.username}
           onChange={handleChange}
           required
         /></div>
            </div>
         
   
        <div className='flex w-full mb-12'>
         <div className='w-2/6'>
           <label>Password:</label>
         </div>
         <div className='h-full w-full  flex justify-center '>
          <input
           type="password"
           name="password"
           value={formData.password}
           onChange={handleChange}
           required
         />
         </div>
         
        </div>
        
   
        <div className='flex w-full mb-12'>
           <div className='w-2/6'>
            <label>Cover Image:</label>
           </div>
         <div className='h-full w-full  flex justify-center '>
          <input
         className='text-gray-500'
           type="file"
           name="coverImage"
           accept="image/*"
           onChange={handleFileChange}
           required
         />
         </div>
        </div>
         
   
        <div className='flex w-full mb-12'>
           <div className='w-2/6'>
            <label>Avatar:</label>
           </div>
         <div className='h-full w-full  flex justify-center '>
          <input
         className='text-gray-500'
           type="file"
           name="avtar"
           accept="image/*"
           onChange={handleFileChange}
           required
         />
         </div>
        </div>
         
   
         <button type="submit" id='submit' className='flex justify-center' onClick={handleSubmit}>
          {loading?
         <ClipLoader/>
          :'Submit'}
         </button>
                       
                 </form>
                 <div className='absolute flex w-full right-0 text-sm bottom-0 '>
                    Alreafy Registered? <div className='bg-purple-800 w-1/5 text-center rounded-2xl'> <Link to={'/login'} className=' pl-1 pr-1 text-sm text-sm text-white rounded-2xl' >Login Here</Link>
</div>
                 </div>
               </div>
                
                       
   
           </div>
   
             <div className="footer">
                  
                   
                       <div className='flex justify-evenly'> <div>Powered by OneLogin</div> <div>Terms </div>   <div>Privacy Policy</div></div>
                  
            </div>
   
   
   
   
       </div>
  );
};

export default UploadForm;
