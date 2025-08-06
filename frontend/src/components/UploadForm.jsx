import React, { useState } from 'react';
import bg from '../assets/bg.png'

const UploadForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
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
    data.append('coverImage', coverImage);
    data.append('avtar', avtar);

    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      console.log('Server Response:', result);
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };

  return (
    <div className='flex justify-center items-center w-svw h-svh m-0 telus p-0'  >
      <form className='bg-zinc-300 form' onSubmit={handleSubmit}>

            <div>

            </div>
            <div>
              
            </div>

      </form>
     <div class="footer">
                <div class="innerelem">
                
                    <div> Powered by OneLogin &emsp;&emsp; Terms &emsp;&emsp; Privacy Policy</div>
               </div>
         </div>
    </div>
  );
};

export default UploadForm;
