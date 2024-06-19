import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import login_img from '../img/video_img.jpg'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { loginStart, loginFailure, loginSuccess } from '../redux/userSlice.js'

function Signin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { currentUser, loading, error } = useSelector(state => state.user)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'


    useEffect(() => {
        if (currentUser) {
          navigate(from) // Redirect to the intended page
        }
      }, [currentUser, navigate, from])

    const handleLogin = async(e)=>{
        e.preventDefault();
        dispatch(loginStart())
        try{
            const res = await axios.post("/auth/signin", {email, password})
            dispatch(loginSuccess(res.data))
        }catch(err){
            dispatch(loginFailure())
        }
    }

  return (
    <div>
        <div className='body_container'>
            <div className="login_container">
                <div className="login">
                    <form className="login_form">
                        <h1 className='login_h1'>Login</h1>
                        <hr className='login_hr' />
                        <p className='login_p'>YourTube</p>
                        {error && <p style={{ color: 'red', textAlign:"center" }}>Failed to login, Try again</p>}
                        <label>Email</label>
                        <input className='login_input' type="text" placeholder="username@gmail.com" onChange={e=>setEmail(e.target.value)} required />
                        <label>Password</label>
                        <input className='login_input' type="password" placeholder="enter your password!" onChange={e=>setPassword(e.target.value)} required />
                        <button className='login_button' onClick={handleLogin} disabled={loading} >{loading ? 'Loading...' : 'Login'}</button>
                        <p className='login_p'>
                        <Link className='login_a' to="/forgotPassword">Forgot Password?</Link>
                        </p>
                        <p>
                            <Link className='login_a hover:underline' to="/signup">Don't have an account?Sign Up</Link>
                        </p>
                    </form>
                </div>
                <div className="pic">
                    <img className='login_img' src={login_img} style={{objectFit: "cover" }} alt='login_img' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin