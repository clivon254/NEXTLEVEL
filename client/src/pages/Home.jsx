


import React, { useContext, useState } from 'react'
import {MdAddShoppingCart} from "react-icons/md"
import SlideProducts from '../components/SlideProducts'
import { StoreContext } from '../context/store'
import axios from 'axios'
import { toast } from 'sonner'
import Banner from '../components/Banner'
import Error from '../components/Error'


export default function Home() {
  
  const {products,url,productsError,fetchProducts} = useContext(StoreContext)

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

    <>

      {!productsError && (
     
        <section className="">
          
          {/* banner */}
          <Banner/>

          {/* best selling products */}
          <article className="section space-y-5 ">
            
            <h2 className="title2">Best selling products</h2>

            <SlideProducts products ={products} />

          </article>
          
          {/* latest products */}
          <article className="section space-y-5 ">
            
            <h2 className="title2">Latest products </h2>

            <SlideProducts products ={products} />

          </article>

          {/* featured products */}
          <article className="section space-y-5 ">
            
            <h2 className="title2">Featured products</h2>

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

      )}


      {productsError && (
       
        <Error fetch={fetchProducts}/>

      )}

    </>
  )
  
}
