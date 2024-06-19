import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

function Video() {
  return (
        <>
            <Nav/>
            <section className="flex justify-center w-full bg-gray-100">
            <div className="w-full max-w-[1400px]">
                <div className="m-[10%]">
                    <div>
                        <div className="border-2 border-gray-800 w-[80%] h-[25rem]">
                            <iframe
                                width="100%"
                                height="396"
                                src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                    <div className="my-7">
                        <div className="flex justify-between items-center w-[80%]">
                            <h1 className="text-3xl my-1 font-semibold text-gray-800"><Link to="#">Video Title</Link></h1><Link to="#" className="text-gray-800 border-b border-gray-700 pb-1 hover:border-gray-800 hover:font-semibold transition-all">See more like this</Link>
                        </div>
                        <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, maxime?</p>
                    </div>
                </div>
            </div>
        </section>
        </>
        
        
  )
}

export default Video