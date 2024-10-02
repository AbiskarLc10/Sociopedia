import{ React, useContext }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import HeaderToggleInfo from './HeaderToggleInfo';
import { stateContext } from '../Context/stateContext';
const HeaderToggleComponent = () => {

    const {currentUser} = useSelector((state)=> state.user);
    const {setToggleProfile} = useContext(stateContext);
  return (
  <>
    <div onMouseLeave={()=> setToggleProfile(false)} className=' flex flex-col border-2 z-20 rounded-lg dark:bg-slate-900 dark:border-gray-700 bg-white w-[300px] right-[40px] top-[60px] absolute shadow-lg p-4'>
      <div className=' flex flex-col gap-2'>
        <div className=' flex flex-col items-center gap-2 p-1 border-2  dark:border-gray-700 shadow-lg  rounded-lg'>
          <div className='flex items-center gap-2 w-full'>
          <img src={currentUser?currentUser.picturePath:""} className='w-10 h-10 rounded-full mt-1' alt="" srcSet="" />
           <p>{currentUser?`${currentUser.firstName} ${currentUser.lastName}`:""}</p>
          </div>
        <hr  className='  dark:border-gray-700 border-gray-300 border-[1px] w-full'/>
         
         <p className=' text-blue-700 cursor-pointer text-start'>See all Profiles</p>
        </div>
       <HeaderToggleInfo text={"Posts"}/>
       <HeaderToggleInfo text={"signout"}/>
       <HeaderToggleInfo text={"settings"}/>
      </div>

    </div>
  </>
  )
}

export default HeaderToggleComponent