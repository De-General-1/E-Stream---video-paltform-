import React from 'react'
import { Link } from 'react-router-dom'

function Showcase() {
  return (
    <div>
        <section className="flex justify-center px-[10%] mx-auto bg-gray-800">
            <div className="relative h-[50%] md:h-[60%] lg:h-[80%] w-full max-w-[1300px]">
                <div className="w-[100%] sm:w-[90%] md:w-[80%] lg:w-[60%] mt-[4rem] md:mt-[4rem] pb-[25%] md:pb-[10%]">
                    <h1 className="font-bold text-white text-4xl">Amazing videos just for you</h1>
                    <p className="my-5 text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt consequuntur rerum sint reprehenderit assumenda dolorem itaque magni cupiditate at deleniti</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-300">Browse Video pages</h1>
                </div>

                <div className="absolute -bottom-[1px]">
                    <nav className="flex gap-2">
                        <Link to="#" className="active-nav min-w-[4rem] md:min-w-[7rem] bg-white rounded-t-md inline-block text-gray-800 font-semibold text-[14px] md:text-[20px] text-center px-3 py-3">Business</Link>
                        <Link to="#" className="inline-block min-w-[4rem] md:min-w-[7rem] rounded-t-md  text-white font-semibold text-[14px] md:text-[20px] text-center px-3 py-3">Education</Link>
                        <Link to="#" className="inline-block min-w-[4rem] md:min-w-[7rem] rounded-t-md text-white font-semibold text-[14px] md:text-[20px] text-center px-3 py-3">Technology</Link>
                        <Link to="#" className="inline-block min-w-[4rem] md:min-w-[7rem] bg-white rounded-t-md text-gray-800 font-semibold text-[14px] md:text-[20px] text-center px-3 py-3">All</Link>
                    </nav>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Showcase