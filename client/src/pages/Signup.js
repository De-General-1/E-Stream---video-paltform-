import React from 'react'
import '../css/login.css'
import signup_img from '../img/video_img.jpg'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='body_container'>
        <div className="login_container">
            <div className="login">
                <form className=' login_form'>
                    <h1 className='login_h1'>Sign Up!</h1>
                    <hr className='login_hr '/>
                    <p className='login_p'>Explore the World!</p>
                    <label>Name</label>
                    <input className='login_input' type="text" placeholder="Username" required/>
                    <label>Email</label>
                    <input className='login_input' type="email" placeholder="abc@exampl.com" required/>
                    <label>Password</label>
                    <input className="login_input" type="password" placeholder="enter your password!" required/>
                    <button className='login_button'>Sign up</button>
                    <p className='login_p'>
                    <Link className='login_a' to="/signin" style={{fontSize:'14px'}}>Already have an account?SignIn</Link>
                    </p>
                </form>
            </div>
            <div className="pic">
                <img className='login_img' src={signup_img} style={{objectFit: "cover"}} alt='signup_img' />
            </div>
        </div>
    </div>
  )
}

export default Signup