

import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export const StoreContext = createContext(null)


export default function StoreContextProvider(props){
  
  const {currentUser} = useSelector(state => state.user)

  const [token,setToken] = useState(null)
  
  const url = "http://localhost:1200"

  const [open, setOpen] = useState(false)

  const [products, setProducts] = useState([])

  const [productsError, setproductsError] = useState(false)

  const [productsLoading, setProductsLoading] = useState(false)

  const [showModal, setShowModel] = useState(false)

  // fetchProducts
  const fetchProducts  = async () => {

    try
    {
      setProductsLoading(true)

      setproductsError(false)

      const res = await axios.get(url + "/api/product/get-products")

      if(res.data.success)
      {
        setProductsLoading(false)

        setproductsError(false)

        setProducts(res.data.products)
      }
      else
      {
        setProductsLoading(false)

        setProductsLoading(false)

        console.log(error.message)
      }

    }
    catch(error)
    {
      setProductsLoading(false)

      setProductsLoading(false)

      console.log(error.message)
    }

  }

 

  useEffect(() => {

    if(localStorage.getItem("token"))
    {
      setToken(localStorage.getItem("token"))
    }

    fetchProducts()

  },[])

  const contextValue = {
    url,
    open,
    setOpen,
    token,
    setToken,
    products,
    setProducts,
    productsError,
    setproductsError,
    productsLoading,
    setProductsLoading,
    fetchProducts,
  }
 

  return (
    
    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )

}
