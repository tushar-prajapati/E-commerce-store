import React from 'react'
import { useState } from 'react'
import {AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Navigation.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation, useLogoutMutation } from '../../redux/api/usersApiSlice.js'
import { logout } from '../../redux/features/auth/authSlice.js'
import FavoritesCount from '../Products/FavouritesCount.jsx'


const Navigation = () => {

    const {userInfo} = useSelector(state=>state.auth)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = ()=>{
        setDropdownOpen(!dropdownOpen)
    }
    const toggleSidebar = ()=>{
        setShowSidebar(!showSidebar)
    }

    const closeSidebar = ()=>{
        setShowSidebar(false);
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async ()=>{
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        setDropdownOpen(false);
        navigate('/login')
      } catch (error) {
          console.log(error)
      }
    }

  return (
    <div style={{zIndex:999}} className={`${showSidebar? "hidden": "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`} id='navigation-container'>
      <div className="flex flex-col justify-center space-y-4">
        <Link to='/'
        className='flex items-center transition-transform transform hover:translate-x-2'
        >
        <AiOutlineHome size={26} className='mr-2 mt-[3rem]' />
        <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>
        <Link to='/shop'
        className='flex items-center transition-transform transform hover:translate-x-2'
        >
        <AiOutlineShopping size={26} className='mr-2 mt-[3rem]' />
        <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>
        <Link onClick={()=>toggleDropdown()} to='/cart'
        className='flex items-center transition-transform transform hover:translate-x-2'
        >
        <AiOutlineShoppingCart size={26} className='mr-2 mt-[3rem]' />
        <span className="hidden nav-item-name mt-[3rem]">CART</span>
        </Link>
        <Link to='/favourites'
        className='flex relative'
        ><div className='flex justify-center items-center transition-transform transform hover:translate-x-2'>
        <FaHeart size={26} className='mr-2 mt-[3rem]' />
        <span className="hidden nav-item-name mt-[3rem]">Favourites</span>
        <FavoritesCount />
        </div>
        </Link>
      </div>
      <div className="relative">
        <button onClick={toggleDropdown} className='cursor-pointer flex items-center text-gray-800 focus:ouline-none'>
          {userInfo? <span className='text-white hover:underline'>{userInfo.username}</span>: (<></>)}
          {userInfo && (
            <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-4 w-4 ml-1 ${
              dropdownOpen? "transform rotate-180": ""
              }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='white'
            >
              <path 
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={dropdownOpen? "M5 15L7-7 7 7": "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
          {dropdownOpen && userInfo && (
            <ul className={` absolute right-0 bottom-0 ml-14 space-y-2 bg-gray-700 text-white $userInfo.${!userInfo.isAdmin? "-top-20": "-top-80"} `}>
  {userInfo.isAdmin && (
    <>
    <li>
      <Link onClick={()=>toggleDropdown()} to='/admin/dashboard' className='block px-4 py-2 hover:bg-gray-600'>Dashboard</Link>
    </li>
    <li>
      <Link onClick={()=>toggleDropdown()} to='/admin/allproductslist' className='block px-4 py-2 hover:bg-gray-600'>Products</Link>
    </li>
    <li>
      <Link onClick={()=>toggleDropdown()} to='/admin/categorylist' className='block px-4 py-2 hover:bg-gray-600'>Category</Link>
    </li>
    <li>
      <Link onClick={()=>toggleDropdown()} to='/admin/orderlist' className='block px-4 py-2 hover:bg-gray-600'>Orders</Link>
    </li>
    <li>
      <Link onClick={()=>toggleDropdown()} to='/admin/userlist' className='block px-4 py-2 hover:bg-gray-600'>Users</Link>
    </li>
    
    </>
  )}
  <li>
      <Link onClick={()=>toggleDropdown()} to='/profile' className='block px-4 py-2 hover:bg-gray-600'>Profile</Link>
    </li>
    <li>
      <button onClick={logoutHandler} className='block px-4 py-2 hover:bg-gray-600'>Logout</button>
    </li>
    </ul>
          )}

      </div>

    {!userInfo && (
      <ul>
        <li>
        <Link to='/login'
        className='flex items-center transition-transform transform hover:translate-x-2'
        >
        <AiOutlineLogin size={26} className='mr-2 mt-[3rem]' />
        <span className="hidden nav-item-name mt-[3rem]">Login</span>
        </Link>
        </li>
        <li>
        <Link to='/register'
        className='flex items-center transition-transform transform hover:translate-x-2'
        >
        <AiOutlineUserAdd size={26} className='mr-2 mt-[3rem]' />
        <span className="hidden nav-item-name mt-[3rem]">Register</span>
        </Link>
        </li>
      </ul>
      )}



    </div>
  )
}

export default Navigation