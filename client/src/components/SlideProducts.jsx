

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import ProductCard from './ProductCard'


export default function SlideProducts({products}) {

  const {productsLoading} = useContext(StoreContext)

  return (

    <>
        {productsLoading && (
            <></>
        )}

        {!productsLoading && products && (

            <div className="">

                <Swiper
                    className="mySwiper"
                    spaceBetween={10}
                    slidesPerView={2}
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
