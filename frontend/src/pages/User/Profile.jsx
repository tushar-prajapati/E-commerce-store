import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { setCredentials } from '../../redux/features/auth/authSlice.js'
import { useProfileMutation } from '../../redux/api/usersApiSlice.js'

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {userInfo} = useSelector(state=>state.auth);
    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

    useEffect(()=>{
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    },[userInfo.username, userInfo.email])

    const dispatch = useDispatch();
    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword && password !==''){
            toast.error('Passwords do not match')
        }
        else{
            try {
                if(password !== ''){
                    const res = await updateProfile({password}).unwrap();
                    console.log(res);
                    dispatch(setCredentials({...res}))
                    toast.success("Password changed successfully")
                    setPassword('')
                    setConfirmPassword('')
                }
                if(username !== userInfo.username){
                    const res = await updateProfile({username}).unwrap();
                    console.log(res);
                    dispatch(setCredentials({...res}))
                    toast.success("Username changed successfully")
                }
                if(email !== userInfo.email){
                    const res = await updateProfile({email}).unwrap();
                    console.log(res);
                    dispatch(setCredentials({...res}))
                    toast.success("Email changed successfully")
                }
                
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }

  return (
    <div className='container mx-auto p-4 mt-[10rem]'>
        <div className='flex justify-center items-center md:flex md:space-x-4'>
            <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            <form onSubmit={submitHandler}>
            <div className='mb-4'>
                        <label className="block text-white mb-2">
                            Name
                        </label>
                        <input type="text" className='border  text-white form-input p-4 rounded-sm w-full'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        />
                        <label className="block text-white mb-2">
                            Email
                        </label>
                        <input type="email" className='border  text-white form-input p-4 rounded-sm w-full'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <label className="block text-white mb-2">
                            Password
                        </label>
                        <input type="password" className='border  text-white form-input p-4 rounded-sm w-full'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <label className="block text-white mb-2">
                            Confirm Password
                        </label>
                        <input type="password" className='border  text-white form-input p-4 rounded-sm w-full'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        

                </div>
                <div className="flex justify-between">
                        

                        <button disabled={loadingUpdateProfile} type='submit' className='bg-pink-500 text-white hover:bg-pink-600 px-4 py-2 cursor-pointer rounded my-[1rem]'>{loadingUpdateProfile? "Updating..": "Update"}</button>

                        
                        <Link to='/user-orders' className='bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 h-12'>My Orders</Link>
                        </div>




            </form>
            </div>
            {loadingUpdateProfile && <Loader />}
        </div>
    </div>
  )
}

export default Profile