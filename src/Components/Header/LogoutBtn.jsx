import React from 'react'
import authServiceServer from '../../Appwrite/auth'
import { logout } from '../../Store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authServiceServer.logout()
            // Appwrite returns most of the Promises so we have to handle it with {.then}
            .then(() => {
                // If logout successfull then we dispatch the logout so that store will be updated
                dispatch(logout());
                navigate("/");
            })
            
    };

    return (
        <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-700 rounded-full text-white text-lg'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn