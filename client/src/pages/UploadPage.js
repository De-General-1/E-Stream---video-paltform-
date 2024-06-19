import React, { useState } from 'react'
import { Link, useParams  } from 'react-router-dom'
import login_img from '../img/video_img.jpg'
import axios from 'axios'

function UploadPage() {
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const { token } = useParams();

    const handleUploadPage
     = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.patch(`/auth/UploadPage
                /${token}`, {password,confirmPassword})
            console.log(res.data)
        }catch(err){

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
                        <label>Email</label>
                        <input className='login_input' type="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)} required />
                        <label>Password</label>
                        <input className='login_input' type="password" placeholder="Confirm your password!" onChange={e=>setConfirmPassword(e.target.value)} required />
                        <button className='login_button' onClick={handleUploadPage

                        }>Reset Password</button>
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

export default UploadPage
