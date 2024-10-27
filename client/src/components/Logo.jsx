


import React from 'react'
import Logo from "../assets/Logo.png"



export default function Logo() {

  return (

    <div className=' text-xl sm:text-2xl lg:text-3xl  2xl:text-4xl font-serif'>
        
        <img 
          src={Logo}
          alt="" 
          className="h-20 w-20" 
        />

    </div>

  )

}
