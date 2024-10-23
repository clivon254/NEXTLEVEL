
import React, { useState ,useEffect, useContext} from "react";
import { useSelector } from "react-redux";
import axios from "axios"
import { StoreContext } from "../context/store";
import icon1 from "../assets/01.png"
import icon2 from "../assets/02.png"
import icon3 from "../assets/03.png"
import icon4 from "../assets/04.png"


export default function Contact(){

 const {currentUser,} = useSelector(state => state.user)
  
  const [cartItems, setCartItems] = useState()

  const {token,url} = useContext(StoreContext)

  const contactList =[
    {
      img:icon1,
      title:"Location Address",
      desc:"Gatundu rd,Juja"
    },
    {
      img:icon2,
      title:"Phone number",
      desc:"Gatundu rd,Juja"
    },
    {
      img:icon3,
      title:"Send Email",
      desc:"Gatundu rd,Juja"
    },
    {
      img:icon4,
      title:"Our website",
      desc:"www.nextlevel.ke"
    },
  ]

  const [formData, setFormData] = useState({})

  // handleChange
  const handleChange = () => {}

  // hnadleSubmit 
  const handleSubmit = () => {}


  return (

    <div className="section space-y-20">

     {/* top */}
     <div className="w-full">
     
        <h2 className="title text-center mb-10">
          Get to know us
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-10">

          {/* right */}
          <div className="md:col-span-2 w-full h-[300px] border border-primaryLight dark:border-primaryDark">
            
               <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1994.5411480360683!2d37.00857031436585!3d-1.1005602290831107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1729674720233!5m2!1sen!2ske"  className="w-full h-full" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          
          </div>

          {/* left */}
          <div className="space-y-3">
            {contactList.map((val,i) => (

              <div 
                key={i} 
                className="flex gap-x-5 items-start p-2"
              >

                <img 
                  src={val.img}
                  alt="" 
                  className="" 
                />

                <div className="">

                  <h6 className="text-xl font-semibold">{val.title}</h6>

                  <p className="">{val.desc}</p>

                </div>

              </div>

            ))}
          </div>

        </div>   

     </div>

     {/* bottom */}
     <div className="space-y-10">

      <div className="space-y-5">

        <h2 className="title text-center">Contact us</h2>

        <h2 className="title text-center">Fill the form below</h2>

      </div>

      <form action="" className="space-y-3 max-w-xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <input 
            type="text" 
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input" 
          />

          <input 
            type="email" 
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            className="input" 
          />

        </div>

        <textarea
            type="text" 
            placeholder="Name"
            value={formData.message}
            onChange={handleChange}
            className="input" 
        />

        <button 
          className="btn rounded-xl w-1/2 mx-auto"
          type="submit"
        >
          submit
        </button>

      </form>

     </div>

    </div>
  )

}

