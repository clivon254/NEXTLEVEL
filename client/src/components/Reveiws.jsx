

import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from 'react-rating'
import { MdStar } from 'react-icons/md'
import { StoreContext } from '../context/store'
import axios from 'axios'
import { toast } from 'sonner'
import Reveiw from './Reveiw'

export default function Reveiws({reveiws,productId}) {

  const {url,token} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const [error, setError] = useState(false)

  const [formData, setFormData] = useState({})

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData, [e.target.name]:e.target.value})

  }

  // handleRating
  const handleRating = (rate) => {

    setFormData({...formData, rating:rate})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
        const res = await axios.post(url + `/api/reveiw/create-reveiw/${productId}`,formData,{headers:{token}})

        if(res.data.success)
        {
            setFormData({})

            toast.success("reveiw addded successfully")
        }

    }
    catch(error)
    {
        console.log(error.message)
    }

  }


  return (
    
    <div className="my-10 space-y-5">

        <h2 className="title2">Reveiws ({reveiws.length})</h2>


        {
            currentUser ? 
            (
                <div className="flex items-center gap-x-3">

                    <p className="text-sm">Signed in as</p>

                    <img 
                      src={currentUser.profilePicture}
                      alt="user"
                      className="h-5 w-5 object-cover rounded-full" 
                    />

                    <Link
                        className="text-xs text-amber-500 hover:underline"
                    >
                        @{currentUser.username}
                    </Link>

                </div>
            )
             :
            (
                <div className="text-sm my-5 flex gap-x-5">

                    You must be signed in to add a reveiw

                    <Link to="">Sign in</Link>

                </div>
            )
        }

        {
            currentUser && (

                <form onSubmit={handleSubmit} className="max-w-lg space-y-3">

                    <span className="text-red-500 text-xs">
                        *Rating first*
                    </span>

                    <Rating 
                        initialRating={formData.rating}
                        emptySymbol={<MdStar className=""/>}
                        fullSymbol={<MdStar className="text-amber-300"/>}
                        onChange={handleRating}
                    />

                    <textarea 
                        className="input"
                        placeholder='Add a reveiw'
                        name="content"
                        onChange={handleChange}
                        value={formData.content}
                    />

                    <button 
                        className="btn rounded-xl"
                        type="submit"
                    >
                        submit
                    </button>

                </form>

            )
        }

        {reveiws.length === 0 ?
            (
                <p className="text-sm my-3">
                    No reveiws yet be first one 
                </p>
            )
            :
            (
                <>
                    {reveiws?.map((reveiw) => (

                        <Reveiw
                            key={reveiw._id}
                            reveiw={reveiw}
                        />
                        
                    ))}
                </>
            )
        }


    </div>

  )

}
