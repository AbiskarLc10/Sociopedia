import React, { useContext, useState } from 'react'
import { Button, TextInput,Spinner, Alert } from 'flowbite-react'
import { HiEye,HiEyeOff } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import {signInStart,signInSuccess,signInFailure,clearError} from "../redux/reducers/userSlice"
import axios from 'axios'
import { stateContext } from '../Context/stateContext'
const Login = () => {

  const {error,loading} = useSelector((state)=>state.user);
  const {setLogin} = useContext(stateContext);
   const dispatch = useDispatch();
  const [formdata,setFormData] = useState({
    email:"",
    password:""
  })
    const navigate = useNavigate();
    const [togglePassword,setTogglePassword] = useState(false);


    const handleSubmit = async (e) =>{

      e.preventDefault();
      try {

        dispatch(signInStart());
        const response = await axios.post(`http://localhost:8000/api/auth/login`,
          formdata,
          {
            headers:{
              "Content-Type":"application/json"
            },
            withCredentials:true
          }
        )

        if(response.data){
          dispatch(signInSuccess(response.data))
          setLogin(true);
          navigate(`/feed`);
        }
        
      } catch (error) {
        dispatch(signInFailure(error.response.data.message));
      }
    }
    const handleChange = (e) =>{

      setFormData({
        ...formdata,
        [e.target.name]:e.target.value
      })
    }

    if(error){

      setTimeout(() => {
        
        dispatch(clearError())
      }, 3000);
    }
  return (
    <div className='  flex justify-center'>
         
         <div className=' border-2 border-teal-300 shadow-lg h-auto w-full md:w-[600px] rounded-xl m-4 md:mx-auto p-5 mt-4'>
            <h1 className=' text-2xl '>Welcome to <span className=' text-teal-400 font-semibold capitalize'>sociopedia</span> </h1>
            <form className=' mt-4 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="Email" className=' text-md '>Email Address</label>
                  <TextInput type="email" name='email'  onChange={handleChange}/>
                </div>
                <div className='flex flex-col gap-1 relative'>
                  <label htmlFor="password" className=' text-md '>Password</label>
                  <TextInput type={togglePassword?"text":"password"} name='password'  onChange={handleChange}/>
                  {
                    togglePassword? <HiEyeOff className=' absolute right-2 cursor-pointer hover:text-red-500 top-10' onClick={()=> setTogglePassword(togglePassword?false:true)}/>:

            <HiEye className=' absolute right-2 cursor-pointer hover:text-red-500 top-10' onClick={()=> setTogglePassword(togglePassword?false:true)}/>
                  }
                </div>
                <Button gradientDuoTone={"purpleToPink"} type='submit' className=' text-2xl mt-2' outline disabled={loading}>{loading?<>
                <Spinner /> <span className='ml-2'>Loading...</span>
                </>:"Login"}</Button>
            </form>
            <div className=' mt-4'>
                <p className=' text-sm '>Don't Have an Account? <span className=' text-blue-600 hover:underline cursor-pointer' onClick={()=> navigate("/signup")}>Signup</span></p>
            </div>
            {
              error &&
              <Alert color={"failure"} className='mt-2'>{error}</Alert>
            }
         </div>
           
    </div>
  )
}

export default Login;