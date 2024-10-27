


import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { MdClose, MdSearch } from 'react-icons/md'
import { useLocation } from 'react-router-dom'

export default function SearchBar() {
  
    const {search,visible,setVisible,setSearch,showSearch,setShowSearch} = useContext(StoreContext)
    
    const location = useLocation()

    useEffect(() => {

        if(location.pathname.includes('search'))
        {
            setVisible(true)
        }
        else
        { 
            setVisible(false)
        }

    },[location])

  return visible ? 
    (
        <div className=" bg-secondaryLight/10 dark:bg-secondaryDark/10 text-center">

            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2  ">
               
               <input 
                  type="text" 
                  className="search flex-1 outline-none bg-inherit border-none outline-inherit rounded-full " 
                  placeholder='Search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <MdSearch  size={32}/>

            </div>

            <MdClose 
              size={32} 
              onClick={() => setShowSearch(false)}
              className="inline cursor-pointer"
            />

        </div>
    ) 
    : 
    null

}
