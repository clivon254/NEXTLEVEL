
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Contact(){

 const {currentUser} = useSelector(state => state.user)
 
  return (

    <div className="mx-10">

      <label className='relative cursor-pointer w-full h-full'>

        <input 
            type="text" 
            placeholder="Input" 
            className=' input border-opacity-50  focus:outline-black focus:outline-dashed  placeholder-gray-300 placeholder-opacity-0 transition duration-200' 
        />

        <span className='text-opacity-80  absolute left-5 -top-1 px-1 transition duration-200 input-text bg-bgLight'>
          Input
        </span>

      </label>

     

    </div>
  )

}

