import React from 'react'
import { HiBriefcase, HiLocationMarker, HiUserAdd } from 'react-icons/hi'
import { FaPen, FaLinkedin, FaTwitter } from "react-icons/fa";
import {useSelector} from "react-redux"
const UserCard = () => {

  const {currentUser} = useSelector((state)=> state.user);
  return (
    <div className=' flex flex-col w-full h-fit   lg:w-[330px]   border-2 dark:border-gray-800 rounded-lg shadow-lg lg:p-1 p-4'>
       <div className=' flex items-center gap-2 mb-2'>
          <img className=' w-10 h-10 rounded-full cursor-pointer' src={currentUser.picturePath} alt="" />
          <div className=' flex flex-1 justify-between items-center'>
            <div className=' flex flex-col justify-center'>
              <p className=' text-md lg:text-sm'>{currentUser.firstName+currentUser.lastName}</p>
              <p className=' text-xs '>{currentUser.friends.length} friends</p>
            </div>
            <HiUserAdd className=' text-2xl'/>
          </div>
       </div>
       <hr className=' border-[1px] dark:border-gray-600'/>
       <div className='flex flex-col gap-2 my-2'>
             <div className=' flex gap-2 items-center'>
              <HiLocationMarker className=' text-2xl'/>
              <p className=' text-[12px]'>{currentUser.location}</p>
             </div>
             <div className=' flex gap-2 items-center'>
              <HiBriefcase className=' text-2xl'/>
              <p className=' text-[12px]'>{currentUser.occupation}</p>
             </div>
             <br />
             <div className=' flex text-[12px] justify-between'>
              <p>Who's viewed your profile</p>
              <b>{currentUser.viewedProfile}</b>
             </div>
             <div className=' flex text-[12px] justify-between'>
              <p>Impressions of your post</p>
              <b>{currentUser.impressions}</b>
             </div>
       </div>
       <hr className=' border-[1px] dark:border-gray-600'/>
       <div>
        <h2 className=' font-bold'>Social Profile</h2>
        <div className=' flex flex-col gap-2'>
        <div className=' flex items-center gap-2 mt-3'>
           <FaTwitter className=' text-2xl text-sky-400'/>
          <div className=' flex flex-1 justify-between items-center'>
            <div className=' flex flex-col justify-center'>
              <p className=' text-sm'>Twitter</p>
              <p className=' text-[9px]'>3 friends</p>
            </div>
            <FaPen className=' text-xl'/>
          </div>
       </div>
       <div className=' flex items-center gap-2'>
           <FaLinkedin className=' text-2xl text-blue-700'/>
          <div className=' flex flex-1 justify-between items-center'>
            <div className=' flex flex-col justify-center '>
              <p className=' text-sm'>LinkedIn</p>
              <p className=' text-[9px]'>3 friends</p>
            </div>
            <FaPen className=' text-xl'/>
          </div>
       </div>
        </div>
       </div>
    </div>
  )
}

export default UserCard