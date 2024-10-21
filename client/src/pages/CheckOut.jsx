

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function CheckOut() {
 
  const {cartData,products,totalAmount, getTotalCartAmount} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const [data, setData] = useState({})

  const [paymentMethod, setPaymentMethod] = useState(null)

  const [shippingMethod, setShippingMethod] = useState(null)

  const [error, setError] = useState(null)

  const [Loading, setLoading] = useState(false)

  let TotalAmount = Number(totalAmount || getTotalCartAmount()) + Number(shippingMethod || 0)

  const navigate = useNavigate()

  const [shipping, setShipping] = useState([
    {
      place:"Nairobi",
      value:300
    },
    {
      place:"Kisumu",
      value:500
    },
    {
      place:"Gatundu",
      value:350
    },
    {
      place:"Kisii",
      value:500
    },
    {
      place:"Coast",
      value:700
    }
  ])

  // onChangeData
  const onChangeData = (e) => {

    setData({...data,[e.target.name]:e.target.value})

  }

  // changeShippingMethod
  const changeShippingMethod = (e) => {

    setShippingMethod(e.target.value)

  }

  // placeorder
  const placeorder = async () => {}


  console.log(data)

  console.log(shippingMethod)

  console.log(paymentMethod)

  return (

    <section className="section">

      <div className="flex flex-col md:flex-row gap-10">

        {/* Billing Data */}
        <div className="w-full md:w-[55%] space-y-10">

          {/* contact */}
          <div className="w-full space-y-3">

            <h2 className="title2">Contact</h2>

            <input 
              type="text" 
              className="input"
              placeholder='(07XXXXXX) *mpesa*'
              name="phone"
              onChange={onChangeData}
              value={data.phone}
              required
            />

          </div>

          {/* devilery */}
          <div className="w-full space-y-3">

            <h2 className="title2">Delivery Info</h2>

            <div className="w-full space-y-3">

              <input 
                type="text" 
                className="input"
                placeholder='KENYA'
                name="country"
                onChange={onChangeData}
                value={data.country}
                required
              />

              <div className="w-full flex flex-col md:flex-row gap-3">

                  <input 
                    type="text" 
                    className="input"
                    placeholder='First Name'
                    name="firstName"
                    onChange={onChangeData}
                    value={data.firstName}
                    required
                  />

                  <input 
                    type="text" 
                    className="input"
                    placeholder='Last Name'
                    name="lastName"
                    onChange={onChangeData}
                    value={data.lastName}
                    required
                  />

              </div>

              <input 
                type="text" 
                className="input"
                placeholder='address'
                name="address"
                onChange={onChangeData}
                value={data.address}
                required
              />
               
              <div className="w-full flex flex-col md:flex-row gap-3">

                  <input 
                    type="text" 
                    className="input"
                    placeholder='City'
                    name="City"
                    onChange={onChangeData}
                    value={data.City}
                    required
                  />

                  <input 
                    type="text" 
                    className="input"
                    placeholder='Post Code (optional)'
                    name="postcode"
                    onChange={onChangeData}
                    value={data.postcode}
                    required
                  />

              </div>


            </div>

          </div>

          {/* shipping */}
          <div className="w-full space-y-3">

            <h2 className="title2">Shipping Method</h2>

            <div className="w-full">

              {shipping.map((ship,index) => (

                <div className="w-full flex items-center gap-x-5 p-3 py-5 border border-gray-300 dark:border-gray-600">

                  <input 
                    type="radio" 
                    value={ship.value}
                    onChange={changeShippingMethod}
                    name="shippingMethod"
                    className="flex-shrink" 
                  />

                  <div className="flex-1 flex justify items-center justify-between">

                    <span className="text-sm font-semibold">{ship.place}</span>

                    <span className="text-sm font-semibold">
                        {(ship.value).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                    </span>

                  </div>

                </div>

              ))}
            </div>

          </div>

        </div>

        {/* order summary */}
        <div className="w-full md:w-[45%] space-y-6">

          <h2 className="title2">Order summary</h2>

          {/* products */}
          <div className="flex flex-col gap-y-4">

            {cartData.map((item,index) => {

              const product = products.find((product) => product._id === item._id)

              return(

                <div 
                  key={index}
                  className="flex items-start justify-between gap-x-5"
                >

                  <div className="flex items-start gap-x-5">

                    <img 
                      src={product?.images[0]}
                      alt="" 
                      className="h-10 w-20"
                    />

                    <div className="flex flex-col gap-y-2">

                      <span className="text-xs lg:text-sm font-semibold">{product?.name}</span>

                      <span className="text-xs lg:text-sm font-semibold">Size : <span className="size size-active">{item?.size}</span></span>

                    </div>

                  </div>

                  <div className="text-xs lg:text-sm font-semibold">
                      {product?.discountPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}
                  </div>

                </div>

              )

            } )}
          </div>

          <hr className="" />
          
          {/* cartTotal */}
          <div className="flex items-center justify-between">

            <span className="text-base font-bold">Cart Total</span>

            <span className="font-semibold">
                 {(totalAmount || getTotalCartAmount()).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
            </span>

          </div>

          <hr className="" />

          {/* delivery */}
          <div className="flex items-center justify-between">

            <span className="text-base font-bold">Delivery Charges</span>

            <span className="font-semibold">
                 {(shippingMethod || 0).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
            </span>

          </div>

          <hr className="" />

          {/* total amount */}
          <div className="flex items-center justify-between">

            <span className="text-base font-bold">Total Amount</span>

            <span className="font-semibold">
                 {(TotalAmount).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
            </span>

          </div>

          <hr className="" />

          {/* method of payment */}
          <div className=""></div>

          {/* place */}

        </div>

      </div>

    </section>

  )
  
}
