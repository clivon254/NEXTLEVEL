

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import parcel from "../assets/parcel_icon.svg"


export default function OrderAdmin() {
  
  const {url,token} = useContext(StoreContext)

  const [orders,setOrders] = useState([])

  const [loading , setLoading] = useState(false)

  const [error, setError] = useState(false)

  // fetchOrders
  const fetchOrders = async (token) => {

    try
    {
      setLoading(true)

      setError(false)

      const res = await axios.get(url + "/api/order/admin-orders",{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        setError(null)

        setOrders(res.data.orders)
      }

    }
    catch(error)
    {
      console.log(error.message)

      setError(true)
    }

  }

  // status handler
  const statusHandler = async (event,orderId) => {

    try
    {
      const res = await axios.put(url + "/api/order/update-status",{orderId, status:event.target.value})

      if(res.data.success)
      {
        fetchOrders(token)

        toast.success("updated successfullt")
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }


  useEffect(() => {

    fetchOrders(localStorage.getItem("token"))

  },[])

  console.log(orders)

  return (

   <section className="section">

    <h2 className="title mb-10">Admin Orders</h2>

    <div className="space-y-3">

      {
        orders.map((order,index) => (

          <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 text-xs p-5 rounded-xl">

            <img
             src={parcel} 
             alt="order" 
             className="w-12 rounded-xl" 
            />

            <div className="">

              <div className="">
                {order.items.map((item,index) => {

                  if(index === order.items.length -1)
                  {
                    return <p key={index} className="py-0.5">
                      {item.name} X {item.quantity} <span className="">{item.size}</span>
                    </p>
                  }
                  else
                  {
                    return <p key={index} className="py-0.5">
                    {item.name} X {item.quantity} <span className="">{item.size}</span>,
                  </p>
                  }

                })}
              </div>

              <p className="mt-3 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div className="">

                <p className="">{order.address.street + ","}</p>

                <p className="">{order.address.address + ","}</p>

                <p className="">{order.address.City }</p>

              </div>

              <p className="">
                {order.address.phone}
              </p>

            </div>

            <div className="">

              <p className="text-sm">Items:{order.items.length} </p>

              <p className="mt-3">Method:{order.paymentmethod} </p>

              <p className="">Payement:{order.payment ? 'Done' :'Pending'} </p>

              <p className="">Date:{new Date(order.createdAt).toLocaleDateString()} </p>

            </div>

            <p className="">
            {(order?.amount).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
            </p>

          <select 
            className="input"
            value={order.status}
            onChange={(event) => statusHandler(event,order._id)}
          >

            <option value="Order Placed">Order Placed</option>
            
            <option value="Processing Order">Processing Order</option>

            <option value="Out for Delivery">Out for Delivery</option>

            <option value="Delivered">Delivered</option>

          </select>

          </div>

        ))
      }

    </div>

   </section>

  )
}
