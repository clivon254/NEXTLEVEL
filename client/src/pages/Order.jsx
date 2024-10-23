

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import axios from "axios"

export default function Order() {

  const {url,token} = useContext(StoreContext)

  const [orders,setOrders] = useState([])

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(false)

  // fetchOrders
  const fetchOrders = async (token) => {

    try
    {
      setLoading(true)

      const res = await axios.get(url + "/api/order/user-orders",{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        setError(false)

        setOrders(res.data.orders)
      }
    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  useEffect(() => {

    fetchOrders(token)

  },[])

  return (
    
    <section className="section">

      <h2 className="title mb-5">My Orders</h2>

      <div className="space-y-3">

        {orders.map((order,index) => (

          <div key={index} className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] gap-3 items-start border-2 text-xs p-5 rounded-xl">

            <div className="">

              <div className="">
                {order.items.map((item,index) => {

                  if(index === order.items.length -1)
                  {
                    return (
                    <div key={index} className="py-0.5 flex gap-x-3">

                      <img src={item?.images[0]} alt="" className="w-8 h-8" />

                      {item.name} X {item.quantity} <span className="">{item.size}</span>
                    </div>
                  )
                  }
                  else
                  {
                    return (
                    <div key={index} className="py-0.5 flex gap-x-3">

                      <img src={item?.images[0]} alt="" className="w-8 h-8" />

                      {item.name} X {item.quantity} <span className="">{item.size}</span>
                    </div>
                  )
                  }

                })}
              </div>

              <p className="mt-3 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div className="">

                {/* <p className="">{order.address.street + ","}</p> */}

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

             <div className="border p-2 rounded-xl flex items-center gap-x-3">
              
              <div className="w-4 h-4 bg-primaryLight/50 dark:bg-primaryDark/50 rounded-full grid place-content-center ">

                <span className="block w-2 h-2 bg-primaryLight dark:bg-primaryDark rounded-full animate-ping"/>

              </div>

              <span className="">{order.status}</span>

             </div>

          </div>

        ))}

      </div>

    </section>

  )
}
