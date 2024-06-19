import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import basic_img from '../img/basic.png';
import {format} from "timeago.js"

function Card({video}) {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const handleWatchMore = () => {
        if (!currentUser) {
          navigate('/signin', { state: { from: `/video/${video._id}` } });
        } else {
          navigate(`/video/${video._id}`);
        }
    };

  return (
    <div className="m-[10%]">
        <div className="my-7">
            <div className="flex justify-start items-center w-[80%]">
                <h1 className="text-3xl my-1 font-semibold text-gray-800"><Link to="#">{video.title}</Link></h1>
            </div>
            <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, maxime?</p>
            <p className='text-gray-600'>{video.views} views  {format(video.createdAt)}</p>
        </div>
        <div>
            <div className="border-2 border-gray-800 w-[100%] md:w-[80%] h-[25rem]">
                <img className=' h-[24.8rem] w-[100%] object-cover' src={video.imgUrl ? video.imgUrl : basic_img} alt='thumnail'/>
            </div>
        </div>
        <div className="my-7">
            <div className="flex justify-end items-cent    er w-[80%]">
                <button to="#"  onClick={handleWatchMore} className="text-gray-800 border-b border-gray-700 pb-1 hover:border-gray-800 hover:font-semibold transition-all">Watch more</button>
            </div>
        </div>
    </div>
  )
}

export default Card