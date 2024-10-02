import React, { useState } from 'react'
import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import { HiEye,HiEyeOff } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
const SignUp = () => {


  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [formdata,setFormData] = useState({
    firstName:"",
  lastName:"",
  email:"",
  password: "",
location:"",
  occupation:""
  })
  const handleSubmit = async (e) =>{

    e.preventDefault();
    try {
       setLoading(true);
      const response = await axios.post(`http://localhost:8000/api/auth/signup`,formdata,
      {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      }

      )

      if(response.data){
        setLoading(false);
        navigate(`/login`);
      }
      
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }

  const handleChange = (e) =>{

    setFormData({
      ...formdata,
      [e.target.name]:e.target.value
    })
  }
    const navigate = useNavigate();
    const [togglePassword,setTogglePassword] = useState(false);

    if(error){

      setTimeout(() => {
        
        setError(null)
      }, 3000);
    }
  return (
    <div className=' min-h-screen flex justify-center   '>
         
         <div className=' border-2 border-teal-300 shadow-lg  h-auto w-full md:w-[600px] rounded-xl m-4 md:mx-auto p-5 mt-4'>
            <h1 className=' text-2xl '>Welcome to <span className=' text-teal-400 font-semibold capitalize'>sociopedia</span> </h1>
            <form className=' mt-4 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="firstName" className=' text-md '>First Name</label>
                  <TextInput type="text" name='firstName'value={formdata.firstName} onChange={handleChange} />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="lastName" className=' text-md '>Last Name</label>
                  <TextInput type="text" name='lastName' value={formdata.lastName} onChange={handleChange}/>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="location" className=' text-md '>Address</label>
                  <TextInput type="text" name='location'  value={formdata.location} onChange={handleChange}/>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="occupation" className=' text-md '>Occupation</label>
                  <TextInput type="text" name='occupation' value={formdata.occupation} onChange={handleChange}/>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="Email" className=' text-md '>Email Address</label>
                  <TextInput type="email" name='email' value={formdata.email} onChange={handleChange} />
                </div>
                <div className='flex flex-col gap-1 relative'>
                  <label htmlFor="password" className=' text-md '>Password</label>
                  <TextInput type={togglePassword?"text":"password"} name='password' value={formdata.password} onChange={handleChange}/>
                  {
                    togglePassword? <HiEyeOff className='absolute right-2 cursor-pointer hover:text-red-500 top-10' onClick={()=> setTogglePassword(togglePassword?false:true)}/>:

            <HiEye className='absolute right-2 cursor-pointer hover:text-red-500 top-10' onClick={()=> setTogglePassword(togglePassword?false:true)}/>
                  }
                </div>
                <Button gradientDuoTone={"purpleToPink"} type='submit' className=' text-2xl mt-2' outline disabled={loading}>{loading?<>
                <Spinner /> <span className='ml-2'>Loading...</span>
                </>:"Sign Up"}</Button>
            </form>
            <div className=' mt-4'>
                <p className=' text-sm '>Already Have an Account? <span className=' text-blue-600 hover:underline cursor-pointer' onClick={()=> navigate("/login")}>Login</span></p>
            </div>
            {
              error &&
              <Alert color={"failure"} className=' mt-2'>{error}</Alert>
            }
         </div>
           
    </div>
  )
}

export default SignUp