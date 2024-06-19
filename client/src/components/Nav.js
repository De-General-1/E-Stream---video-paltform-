import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/styles.css'
import { useSelector, useDispatch } from 'react-redux'
import { logout as logoutAction  } from "../redux/userSlice";
import axios from 'axios';


function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const handleLogout = async() => {
        try {
            await axios.get('/auth/logout');  // Server-side logout
            dispatch(logoutAction());  // Client-side logout
            navigate('/signin');  // Redirect to homepage
          } catch (err) {
            console.error('Failed to logout:', err);
          }
    };
  return (
    <div>
        <section className="flex justify-center mx-auto bg-gray-800">
            <div className="w-full max-w-[1300px]">
                <nav className="py-4 px-[10%] flex justify-between items-center">
                    <div>
                        <Link to="/" className="text-white text-2xl font-semibold">E-Stream</Link>
                    </div>
                    {currentUser ? (
                    <div className='flex items-center gap-3 text-white'>
                    {currentUser.isAdmin && (<Link to="/upload" className="text-white hover:underline">Upload</Link>)}
                    <div className='w-[32px] h-[32px] rounded-[50%] bg-[#999]'></div>
                        {currentUser.name}
                        <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-5">
                        <Link to="/signup" className="py-[2px] px-3 rounded-[18px] border-2 border-blue-600 text-white hover:bg-gray-900">Join now</Link>
                        <Link to="/signin" className="text-white hover:border-b-2 border-white">Sign in</Link>
                        </div>
                    )}
                </nav>
            </div>
        </section>
    </div>
  )
}

export default Nav