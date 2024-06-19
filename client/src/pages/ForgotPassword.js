import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'
//import security_img from '../img/login_background-2.jpg'
import axios from 'axios'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleForgotPassword = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("/auth/forgotPassword", {email})
            console.log(res.data)
            setModalMessage('An email has been successfully sent to this email address.');
            setModalVisible(true);
        }catch(err){
            setModalMessage('Error: Unable to send email. Please Try again');
            setModalVisible(true);
        }
    }

    const closeModal = () => {
        setModalVisible(false);
        setModalMessage('');
    };
  return (
    <div className="h-[100vh] overflow-x-hidden flex justify-center items-center my-auto" style={{background: "#1f2937", backgroundPosition: "center", backgroundSize: "cover"}}>
        <div className="relative flex justify-center md:w-full transition-all">
            <div className="relative bg-white border-2 border-[#1f2937] rounded p-5 md:p-16">
                <form className="">
                    <div className="text-center text-xl md:text-4xl font-bold text-[#022140]">DevVid</div>
                    <h1 className="text-2xl md:text-5xl text-[#1f2937] font-semibold my-2 transition-all">Forgot your Password?</h1>
                    <h1 className="font-semibold text-lg md:text-xl text-gray-600 my-2 transition-all">Reset password by entering your email address</h1>
                    <div className=" my-5">
                        <label className="block text-gray-600">Email Address:</label>
                        <input type="email" className="p-2 border-2 border-[#1f2937] rounded-md w-full" onChange={e=>setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <button className="p-2 md:p-3 w-full rounded bg-[#1f2937] hover:bg-[#162432e7] text-gray-100 font-semibold" onClick={handleForgotPassword}>Send Intructions</button>
                    </div>
                    <div className="flex items-center my-5"> 
                        <div className="w-[45%] h-0.5 border-b bg-[#1f2937]"></div>
                        <div className="w-[10%] text-center">Or</div>
                        <div className="w-[45%] h-0.5 border-b bg-[#1f2937]"></div>
                    </div>
                </form>
                <div className="flex justify-between">
                    <div>
                        <h1>Don't have an account?</h1>
                        <Link to="/signup" className="text-xl md:text-2xl font-bold text-[#1f2937] hover:text-[#022140]">Sign Up</Link>
                    </div>
                    <div>
                        <Link to="/signin" className="text-xl md:text-2xl font-bold text-[#1f2937] hover:text-[#022140]">Login</Link>
                    </div>
                    
                </div>
            </div>
            
        </div>
        {modalVisible && (
                <Modal message={modalMessage} closeModal={closeModal} />
            )}
    </div>
  )
}

export default ForgotPassword