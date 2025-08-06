import React, { useState } from 'react'
import logo from '../assets/logo.png'
import bg from '../assets/bg.png'

function Register() {
  const [fullName,setFullName]=useState()
  const [email,setEmail]= useState()
  const [username, setUsername] = useState()
  const [password,setpassword]= useState()
  const [avtar,setAvtar] =useState()
  const [coverImage,setCoverImage]=useState()
  const [user,setUser]= useState({})

  const reqHit = async ()=>{
    preventDefault()
    
   await fetch('http://localhost:3000/',{method:'POST',
      body:JSON.stringify({
        fullName:fullName,
        email:email,
        password:password,
        username:username,
        coverImage:coverImage,
        avtar:avtar
      })
    })
  }



  return (
    <div>
      <div class="bg">
        <div class="center">
            <div class="inner-img">
                 <img src={logo}/>
            </div>

            <form class="form" method='POST'>
               
                   <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <br />

      <label>Cover Image:</label>
      <input
        type="file"
        name="coverImage"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <br />

      <label>Avatar:</label>
      <input
        type="file"
        name="avtar"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <br />

      <button type="submit">Submit</button>
                    
              </form>
            </div>
             
                    

        </div>

          <div class="footer">
                <div class="innerelem">
                
                    <div> Powered by OneLogin &emsp;&emsp; Terms &emsp;&emsp; Privacy Policy</div>
               </div>
         </div>




    </div>
    
  )
}

export default Register