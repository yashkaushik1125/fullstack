import React, { useEffect, useState } from 'react';
import bg from '../assets/bg.png'
import logo from '../assets/logo.png'
import { useNavigate ,NavLink , Link } from 'react-router-dom';
import SuccessRegister from './SuccessRegister';

const UploadForm = () => {
  const [user,setUser] = useState({})
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

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('username',formData.username)
    data.append('coverImage', coverImage);
    data.append('avtar', avtar);

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/register', {
        method: 'POST',
        body: data,
      }).then((e)=>e.json()).then((e)=>setUser(e)).catch((error)=>console.log(error)
      )

      
      
      console.log('Server Response:', user);
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };
  const navigate=useNavigate()
useEffect(()=>{
  if(user.message)
    navigate('/registeredSuccesfully',{state:{user}})    
},[user])


  return (
   user.message?<SuccessRegister/>:<div>
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
         
   
         <button type="submit" id='submit' onClick={handleSubmit}>Submit</button>
                       
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
