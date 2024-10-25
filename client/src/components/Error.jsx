


import React, { useContext } from 'react'
import { StoreContext } from '../context/store'

export default function Error({fetch}) {
  

  return (

    <div className="w-full flex flex-col gap-y-5 items-center text-xl px-5 mt-10">
        
        <h2 className="text-center font-bold">Connection failed !</h2>

        <p className="text-center text-base font-semibold">Check your conection to the internet and try again</p>

        <span 
            className="block border-2 rounded-full px-6 py-2 font-semibold "
            onClick={()  => fetch()}
        >
            Retry
        </span>

    </div>

  )

}
