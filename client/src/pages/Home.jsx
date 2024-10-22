


import React, { useContext, useState } from 'react'
import img1 from "../assets/img1.webp"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"
import {MdAddShoppingCart} from "react-icons/md"
import SlideProducts from '../components/SlideProducts'
import { StoreContext } from '../context/store'
import axios from 'axios'
import { toast } from 'sonner'


export default function Home() {
  
  const {products,url} = useContext(StoreContext)

  const [email, setEmail] = useState(null)

  // subscribe
  const handleSubscribe = async () => {

    try
    {

      const res = await axios.post(url + "/api/subscribe/add-subscriber",{email})

      if(res.data.success)
      {
        toast.success("you have successfully")

        setEmail(null)

      }
      else
      {
        toast.error("you have already subscribed")
      }

    }
    catch(error)
    {
      console.log(error)

      toast.error("network error")
    }

  }

  return (

   <section className="">
    
    {/* banner */}
    <article className="section w-full h-full flex flex-col md:flex-row gap-x-5 gap-y-7">

      {/* right */}
      <div className="flex flex-col w-full md:w-[70%] gap-y-3 p-2">
        
        <div className="h-[50%] flex flex-col items-start ">

          <span className="text-4xl sm:text-4xl lg:text-6xl font-black">Life's a runaway,</span>

          <span className="text-4xl sm:text-4xl lg:text-6xl font-black">Own the stage</span>

        </div>

       {/* images */}
        <div className="h-[50%] flex flex-col  md:flex-row w-full gap-x-5 gap-y-3">

          {/*right  */}
          <div className="w-full md:w-[50%]">

            <img 
              src={img1} 
              alt="" 
              className="w-full h-full rounded-2xl" 
            />

          </div>

          {/* left */}
          <div className="w-full md:w-[50%] flex flex-col gap-y-3">

            <img 
                src={img2} 
                alt="" 
                className="w-full h-[50%] rounded-2xl" 
            />
            
            <div className="h-[50%] bg-primaryLight dark:bg-primaryDark rounded-2xl p-3">
              
              <h2 className="text-2xl font-black text-textDark dark:text-slate-100 flex">
                Get 15% of every purchase with us
               
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* left */}
      <div className="flex flex-col w-full md:w-[30%]  gap-y-5 p-2">

        {/* top */}
        <div className="w-full space-y-3">

          <p className="text-xs font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
           Enim, id. Id dolores, dolorum aliquid alias laboriosam maiores
          </p>

          {/* buttons */}
          <div className="flex md:flex-col md:items-start lg:flex-row md:gap-y-2 justify-between items-center">

            <button className="btn rounded-full">
              shop now
            </button>

            <button className="btn2 rounded-full">
              2024 collection
            </button>

          </div>

        </div>

        {/* bottom */}
        <div className="flex-1 w-full">

          <img 
            src={img3} 
            alt="" 
            className="w-full h-full rounded-2xl" 
          />

        </div>

      </div>

    </article>

    {/* products */}
    <article className="section space-y-5 ">
       
       <h2 className="title2">Best selling products</h2>

      <SlideProducts products ={products} />

    </article>

    {/* subscribe */}
    <article className="bg-secondaryLight/10 dark:bg-secondaryDark/10 section  flex flex-col md:flex-row md:justify-between gap-y-5 items-center">

      <p className="font-semibold">
        Enter your email to subscibe  to our newsletter
      </p>

      <div className="relative h-14">

        <input 
            type="text" 
            className="rounded-l-xl h-full dark:text-gray-500" 
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />

        <button 
           className="bg-black text-white h-full px-2 rounded-r-xl"
           onClick={handleSubscribe}
        >
          subscribe
        </button>

      </div>

      <p className="font-semibold md:hidden lg:block">
        get upto 25% discount from coupons
      </p>

    </article>

   </section>

  )
  
}
