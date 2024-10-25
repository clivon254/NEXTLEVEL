

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import ProductCard from './ProductCard'


export default function SlideProducts({products}) {

  const {productsLoading} = useContext(StoreContext)

  const [loader, setLoader] = useState([{},{},{},{},{}])

  return (

    <>
        {productsLoading && (

            <div className="">

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
                    slidesPerView: 2,
                    spaceBetween:20
                    },
                    640: {
                    slidesPerView:3 ,
                    spaceBetween: 30,
                    },
                    768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    },
                    1024: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                    },
                }} 
                navigation={{
                prevEl:'.prev',
                nextEl:'.next'
            }}
            >
                {loader?.map((product,index) => (

                    <SwiperSlide key={index}>

                       <div className="w-full flex flex-col gap-y-1 rounded-t-xl rounded-b shadow animate-pulse">

                            {/* image */}
                            <div className="w-full h-[150px]">

                                <div className="w-full h-full rounded-t-xl bg-gray-300 dark:bg-green-600"/>

                            </div>

                            <div className="space-y-2 px-2 py-1">

                                <span className="text-[9px] bg-secondaryDark dark:bg-green-600 px-4 rounded-full"/>

                                <span className="block h-4 w-40 rounded-full bg-gray-300 dark:bg-green-600"/>

                                <div className="h-4 w-28 rounded-full bg-gray-300 dark:bg-green-600"/>

                            </div>

                       </div>

                    </SwiperSlide>

                ))}
            </Swiper>

        </div>

        )}

        {!productsLoading && products && (

            <div className="">

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
                        slidesPerView: 2,
                        spaceBetween:20
                        },
                        640: {
                        slidesPerView:3 ,
                        spaceBetween: 30,
                        },
                        768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                        },
                        1024: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                        },
                    }} 
                    navigation={{
                    prevEl:'.prev',
                    nextEl:'.next'
                }}
                >
                    {products?.map((product,index) => (

                        <SwiperSlide key={index}>

                            <ProductCard  product={product}/>

                        </SwiperSlide>

                    ))}
                </Swiper>

            </div>

        )}
    </>

  )

}
