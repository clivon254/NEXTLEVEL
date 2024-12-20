

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate, useParams } from 'react-router-dom'
import Rating from "react-rating"
import { MdStar } from 'react-icons/md'
import { Alert, TabItem } from 'flowbite-react'
import { toast } from 'sonner'
import Reveiw from '../components/Reveiw'
import Reveiws from '../components/Reveiws'
import SlideProducts from '../components/SlideProducts'
import { current } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import Error from '../components/Error'



export default function ProductDetails() {
  
  const {url,token,products,fetchCartItems} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const [product, setProduct] = useState({})

  const [Loading, setLoading] = useState(false)

  const [error, setError] = useState(false)

  const {productId} = useParams()

  const [image, setImage] = useState(null)

  const [reveiws, setReveiws] = useState([])

  const [sizes, setSizes] = useState(null)

  const [alert, setAlert] = useState(null)

  const [img, setImg] = useState([{},{},{},{}])


  const navigate = useNavigate()

  // addSize
  const addsize = (size) => {

    try
    {
      setSizes(size)
    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  // fetchProdct
  const fetchProduct = async () => {

    try
    {
      setLoading(true)

      setError(false)

      const res = await axios.get(url + `/api/product/get-product/${productId}`)
      
      if(res.data.success)
      {
        setLoading(false)

        setError(false)

        setProduct(res.data.product)

        setImage(res.data.product.images[0])

      }
      else
      {
        setLoading(false)

        setError(true)

        console.log("error at api")
      }

    }
    catch(error)
    {
        console.log(error.message)

        setLoading(false)

        setError(true)
    }

  }

  // fetchReveiw
  const fetchReveiw = async () => {

    try
    {
      const res = await axios.get(url + `/api/reveiw/get-reveiws/${productId}`)

      if(res.data.success)
      {
        setReveiws(res.data.reveiws)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  // addToCart
  const addToCart = async () => {

    setAlert(null)

    if(!currentUser)
    {
      navigate('/sign-in')
    }

    if(sizes === null)
    {
        return setAlert("please choose a size")
    }

    try
    {
      let data = {
        itemId:productId,
        size:sizes
      }

      const res = await axios.post(url + "/api/cart/add-cart",data,{headers:{token}})

      if(res.data.success)
      {
        toast.success(res.data.message)

        fetchCartItems(token)

        setSizes(null)

      }
      else
      {
        console.log("check the api")
      }
      
    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  // useEffect
  useEffect(() => {

    fetchProduct()

    fetchReveiw()

  },[productId])


  return (

   <section className="section">

      {!Loading && !error && (
          
          <div className="w-full">
            
            {/* upper section */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-5">

              {/* right */}
              <div className="w-full flex flex-col-reverse md:flex-row gap-y-4 lg:col-span-2">

                {/* images lg*/}
                <div className="w-[20%] hidden md:flex  md:justify-start justify-center flex-col  gap-y-4 p-2">

                  {product?.images?.map((url,index) => (

                    <img 
                      key={index}
                      src={url}
                      alt="" 
                      className={`${image === url ? "image-thumb-active":"image-thumb"}`}
                      onClick={() => setImage(url)}
                    />

                  ))}
                </div>

                <div className="w-full md:hidden ">

                  <Swiper
                    className="mySwiper"
                    spaceBetween={10}
                    slidesPerView={4}
                    // loop={true}
                    autoPlay={
                    {
                        delay:2000,
                        disableOnInteraction:false
                    }
                    }
                    modules={[Autoplay,Navigation]}
                    breakpoints={{
                        0: {
                        slidesPerView: 4,
                        spaceBetween:10
                        },
                        640: {
                        slidesPerView:4 ,
                        spaceBetween: 10,
                        },
                        768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                        },
                        1024: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                        },
                    }} 
                    navigation={{
                    prevEl:'.prev',
                    nextEl:'.next'
                    }}
                  >
                          

                      {product?.images?.map((url,index) => (
                        <SwiperSlide key={index}>
                          <img 
                            key={index}
                            src={url}
                            alt="" 
                            className={`${image === url ? "image-thumb-active":"image-thumb"}`}
                            onClick={() => setImage(url)}
                          />
                        </SwiperSlide>
                      ))}

                  </Swiper>

                </div>

                {/* main Image */} 
                <div className="w-full md:w-[80%] h-[60vh] p-2 ">

                  <img 
                    src={image}
                    alt="" 
                    className="h-full w-full mx-auto rounded" 
                  />

                </div>

              </div>

              {/* left */}
              <div className="p-2 space-y-5">

                    {/* name */}
                    <div className="">

                      <h2 className="text-xl font-serif lg:text-2xl">{product.name}</h2>

                    </div>

                    {/* ratings */}
                    <div className="flex items-center gap-4">

                      <Rating 
                        initialRating={product?.rating}
                        emptySymbol={<MdStar className="text-gray-300"/>}
                        fullSymbol={<MdStar className="text-amber-300"/>}
                        readonly
                      />

                      <span className="">
                        ({reveiws?.length})
                      </span>

                    </div>

                    {/* price */}
                    <div className="flex gap-x-2 items-center">

                      <span className="text-sm text-red-300 line-through">{product?.regularPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}</span>

                      <span className="font-semibold">{product?.discountPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}</span>

                    </div>

                    {/* description */}
                    <div 
                      className="text-sm font-thin"
                      dangerouslySetInnerHTML={{__html:product?.description}}
                    />

                    {/* size */}
                    <div className="">

                      <h2 className="mb-2 font-semibold">select size</h2>

                      <div className="flex items-center gap-x-3">

                        {product?.sizes?.map((size,index) => (
                          
                          <div 
                            onClick={() => addsize(size)}
                            key={index} 
                            className={`size ${size === sizes ? "size-active":""}`}
                          >
                            {size}
                          </div>

                        ))}

                      </div>

                    </div>

                    {/* addToCart */}
                    <button 
                        className="btn2"
                        onClick={() => addToCart()}
                    >
                      ADD TO CART
                    </button>

                    {alert && (

                      <Alert color="failure">{alert}</Alert>

                    )}

                    <hr />
                    
                    <div className="flex flex-col gap-y-3 text-gray-500">

                        <p className="">100% Original Product</p>

                        <p className="">Cash on delivery available on this product</p>

                        <p className="">Easy return and exchange policy within 7 days</p>

                    </div>
                    
              </div>

            </div>

            <hr className="my-10 "/>

            {/* lower section */}
            <div className="">
                  
                  <Reveiws
                    reveiws={reveiws}
                    productId={productId}
                  />

                  {/* related products */}
                  <div className="space-y-4">

                    <h2 className="title2">Related products</h2>

                    <SlideProducts products={products}/>

                  </div>

            </div>

          </div>

      )}

      {Loading && !error && (
          
          <div className="w-full animate-pulse">
            
            {/* upper section */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-5">

              {/* right */}
              <div className="w-full flex flex-col-reverse md:flex-row gap-y-4 lg:col-span-2">

                {/* images lg*/}
                <div className="w-full md:w-[20%] flex  md:flex-col md:justify-start justify-center  gap-x-2 gap-y-4 p-2">

                  {img.map((url,index) => (

                    <div 
                      key={index}
                      alt="" 
                      className="w-24 h-24 bg-gray-300 dark:bg-green-600 rounded-xl"
                    />

                  ))}
                </div>

                {/* main Image */} 
                <div className="w-full md:w-[80%] h-[60vh] p-2 mx-auto rounded-xl bg-gray-300 dark:bg-green-600"/>

              </div>

              {/* left */}
              <div className="p-2 space-y-5">

                  {/* name */}
                  <div className="h-4 w-60 rounded-full bg-gray-300 dark:bg-green-600"/>

                  {/* ratings */}
                  <div className="flex items-center gap-4">

                      <Rating 
                        initialRating={product?.rating}
                        emptySymbol={<MdStar className="text-gray-300"/>}
                        fullSymbol={<MdStar className="text-amber-300"/>}
                        readonly
                      />

                  </div>

                  {/* price */}
                  <div className="h-4 w-40 rounded-full bg-gray-300 dark:bg-green-600"/>

                      
                  {/* description */}
                  <div  className="h-24 w-72 rounded-xl bg-gray-300 dark:bg-green-600"/>

                  {/* size */}
                  <div className="space-y-2">

                      <div className="h-2 w-20 rounded-full bg-gray-300 dark:bg-green-600"/>

                      <div className="flex items-center gap-x-3">

                        <span className="h-8 w-8 block rounded-xl bg-gray-300 dark:bg-green-600"/>

                        <span className="h-8 w-8 block rounded-xl bg-gray-300 dark:bg-green-600"/>
                        
                        <span className="h-8 w-8 block rounded-xl bg-gray-300 dark:bg-green-600"/>

                        <span className="h-8 w-8 block rounded-xl bg-gray-300 dark:bg-green-600"/>

                        <span className="h-8 w-8 block rounded-xl bg-gray-300 dark:bg-green-600"/>

                      </div>

                  </div>

                  {/* addToCart */}
                  <div className="h-10 w-40 rounded-xl bg-gray-300 dark:bg-green-600"/>

                  {alert && (

                    <Alert color="failure">{alert}</Alert>

                  )}

                  <hr />
                    
                  <div className="flex flex-col gap-y-3 text-gray-500">

                      <div className="h-2 w-48 rounded-full bg-gray-300 dark:bg-green-600"/>

                      <div className="h-2 w-48 rounded-full bg-gray-300 dark:bg-green-600"/>

                      <div className="h-2 w-48 rounded-full bg-gray-300 dark:bg-green-600"/>

                  </div>
                    
              </div>

            </div>

            <hr className="my-10 "/>

            {/* lower section */}
            <div className="space-y-10">

              <div className="space-y-7">
                  
                <div className=" h-4 w-60 rounded-full bg-gray-300 dark:bg-green-600"/>

                <div className="flex flex-col gap-y-3">
                  
                    {/* reveiw */}
                    <div className="flex item-start gap-x-3 ">

                      <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-green-600"/>

                      <div className="h-20 w-60 rounded-xl bg-gray-300 dark:bg-green-600"/>

                    </div>

                    {/* reveiw */}
                    <div className="flex item-start gap-x-3 ">

                      <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-green-600"/>

                      <div className="h-20 w-60 rounded-xl bg-gray-300 dark:bg-green-600"/>

                    </div>


                    {/* reveiw */}
                    <div className="flex item-start gap-x-3 ">

                      <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-green-600"/>

                      <div className="h-20 w-60 rounded-xl bg-gray-300 dark:bg-green-600"/>

                    </div>

                    {/* reveiw */}
                    <div className="flex item-start gap-x-3 ">

                      <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-green-600"/>

                      <div className="h-20 w-60 rounded-xl bg-gray-300 dark:bg-green-600"/>

                    </div>

                    {/* reveiw */}
                    <div className="flex item-start gap-x-3 ">

                      <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-green-600"/>

                      <div className="h-20 w-60 rounded-xl bg-gray-300 dark:bg-green-600"/>

                    </div>

                </div>

             </div>

              {/* related products */}
              <div className="space-y-4">

                <h2 className="title2">Related products</h2>

                <SlideProducts products={products}/>

              </div>

            </div>

          </div>
          
      )}

      {!Loading && error && (
          
        <Error  fetch={fetchProduct}/>
          
      )}

  </section>
    
  )

}
