


import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { StoreContext } from '../context/store'

export default function Header() {

  const {currentUser} = useSelector(state => state.user)

  const {open, setOpen} = useContext(StoreContext)

  return (
    
    <header className="w-full mx-auto p-5">
      
      <div className="flex flex-between">

        <div className="">

          
        </div>

        <div className=""></div>

        <div className=""></div>

      </div>

    </header>

  )

}
