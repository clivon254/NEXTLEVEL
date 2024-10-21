


import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import axios from 'axios'

export default function Verify() {

  const [searchParams, setSearchParams] = useSearchParams()

  const success = searchParams.get("success")

  const orderId = searchParams.get("orderId")

  const {url} = useContext(StoreContext)

  const navigate = useNavigate()
  
  // verify payment
  const verifyPayment = async () => {

     try
     {
        const response = await axios.post(url + "/api/order/verify-order",{success,orderId})

        if(response.data.success)
        {
            navigate("/orders")
        }
        else
        {
            navigate('/')
        }
     }
     catch(error)
     {
        console.log(error.message)
     }

  }   

  useEffect(() => {

    verifyPayment()

  },[])

  return (

   <div className="min-h-[80vh] grid">

    <div className="place-content-center">

        <span className="Loading"/>
        
    </div>

   </div>

  )

}
