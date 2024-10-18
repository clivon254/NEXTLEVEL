

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
   
  const [cartItems, setCartItems] = useState([])
  

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


  // totalCart
  const getTotalCartAmount = () => {

    

    try
    {
       let totalAmount = 0 ;

        for(const item in cartItems)
        {
          if(cartItems[item] > 0)
          {
             let itemInfo = products.find((product) => product._id === item)

             if(itemInfo)
             {
              totalAmount += itemInfo.discountPrice * cartItems[item]
             }
          }

        }

        return totalAmount

    }
    catch(error)
    {}

  }

 // fetchCartItems
 const fetchCartItems = async (token) => {

  try
  {

    const res = await axios.get(url + "/api/cart/get-cart",{headers:{token}})

    if(res.data.success)
    {
      setCartItems(res.data.cartData)
    }
    else
    {
      console.log("Check the api")
    }

  }
  catch(error)
  {
    console.log(error.message)
  }

 }

  //  getCartCount
  const getCartCount = () => {

    let totalCount = 0 ;

    for(const items in cartItems)
    {
      for(const item in cartItems[items])
      {
        try
        {
          if(cartItems[items][item] > 0)
          {
            totalCount += cartItems[items][item]
          }
        }
        catch(error)
        {
          console.log(error.message)
        }
      }
    }

    return totalCount

  }
 
  console.log(cartItems)


  useEffect(() => {

    if(localStorage.getItem("token"))
    {
      setToken(localStorage.getItem("token"))

      fetchCartItems(localStorage.getItem("token"))

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
    getTotalCartAmount,
    getCartCount
  }
 

  return (
    
    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )

}
