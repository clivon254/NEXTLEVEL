

import React, { createContext, useState } from 'react'


export const StoreContext = createContext(null)


export default function StoreContextProvider(props){
  
  const url = "http://localhost:1200"

  const {open, setOpen} = useState(false)

  const contextValue = {
    url,
    open,
    setOpen
  }

  return (
    
    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )

}
