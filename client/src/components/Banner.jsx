


import React from 'react'
import img1 from "../assets/img1.webp"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"


export default function Banner() {

  return (

    <article className="section w-full h-full flex flex-col md:flex-row gap-x-5 gap-y-7">

      {/* right */}
      <div className="flex flex-col w-full md:w-[70%] gap-y-3 p-2">
        
        <div className="h-[50%] flex flex-col items-start ">

          <span className="text-4xl sm:text-4xl lg:text-6xl font-black">Life's a runaway,</span>

          <span className="text-4xl sm:text-4xl lg:text-6xl font-black">Own the stage</span>

        </div>

       {/* images */}
        <div className="h-[50%] flex flex-col  md:flex-row w-full gap-x-5 gap-y-3">

          {/*right  */}
          <div className="w-full md:w-[50%]">

            <img 
              src={img1} 
              alt="" 
              className="w-full h-full rounded-2xl" 
            />

          </div>

          {/* left */}
          <div className="w-full md:w-[50%] flex flex-col gap-y-3">

            <img 
                src={img2} 
                alt="" 
                className="w-full h-[50%] rounded-2xl" 
            />
            
            <div className="h-[50%] bg-primaryLight dark:bg-primaryDark rounded-2xl p-3">
              
              <h2 className="text-2xl font-black text-textDark dark:text-slate-700 flex">
                Get 15% of every purchase with us
               
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* left */}
      <div className="flex flex-col w-full md:w-[30%]  gap-y-5 p-2">

        {/* top */}
        <div className="w-full space-y-3">

          <p className="text-xs font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
           Enim, id. Id dolores, dolorum aliquid alias laboriosam maiores
          </p>

          {/* buttons */}
          <div className="flex md:flex-col md:items-start lg:flex-row md:gap-y-2 justify-between items-center">

            <button className="btn rounded-full">
              shop now
            </button>

            <button className="btn2 rounded-full">
              2024 collection
            </button>

          </div>

        </div>

        {/* bottom */}
        <div className="flex-1 w-full">

          <img 
            src={img3} 
            alt="" 
            className="w-full h-full rounded-2xl" 
          />

        </div>

      </div>

    </article>

  )

}
