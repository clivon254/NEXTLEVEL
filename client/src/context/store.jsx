

import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export const StoreContext = createContext(null)


export default function StoreContextProvider(props){
  
  const {currentUser} = useSelector(state => state.user)

  const [token,setToken] = useState(null)
  
  const url = "http://localhost:1200"

  const [open, setOpen] = useState(false)

  useEffect(() => {

    if(localStorage.getItem("token"))
    {
      setToken(localStorage.getItem("token"))
    }

  },[])

  const contextValue = {
    url,
    open,
    setOpen,
    token,
    setToken
  }
 

  return (
    
    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )

}
