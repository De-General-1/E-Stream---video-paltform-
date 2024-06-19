import React, { useEffect, useState } from 'react'
import axios from "axios"
import Card from "../components/Card";
import Nav from '../components/Nav';
import Showcase from '../components/Showcase';

const Home = () => {

    const [videos, setVideos ] = useState([])

    useEffect( () => {
        const fetchVideo = async () =>{
            const res = await axios.get("/videos/random")
            setVideos(res.data)
        }
        fetchVideo()
    }, [])
  return (
    <>
      <Nav />
      <Showcase />
      <section className="flex justify-center w-full bg-gray-100">
        <div className="w-full max-w-[1400px]">
          {videos.map((video) => {
              return <Card key={video._id} video={video} />
            })} 
        </div>
      </section>
    </>
    
  );
}

export default Home;