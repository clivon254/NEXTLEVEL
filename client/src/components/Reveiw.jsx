


import React from 'react'
import { MdStar } from 'react-icons/md'
import Rating from 'react-rating'
import moment from "moment"



export default function Reveiw({reveiw}) {

  return (

   <div className="max-w-lg flex p-2 pt-4 text-sm mt-5 border-b dark:border-gray-600 border-gray-300 ">

    <div className="flex-shrink-0 mr-3">

        <img 
            src={reveiw.userId.profilePicture} 
            alt={reveiw.userId.username}
            className="h-10 w-10 rounded-full " 
        />

    </div>

    <div className="flex-1">

        <Rating 
            initialRating={reveiw.rating}
            emptySymbol={<MdStar className=""/>}
            fullSymbol={<MdStar className="text-amber-300"/>}
            readonly
        />

        <div className="flex items-center justify-between mb-1">

            <span className="font-bold mr-1 text-xs truncate">
                {reveiw.userId.username}
            </span>

            <span className="text-xs">
                {moment(reveiw.createdAt).fromNow()}
            </span>

        </div>

        <p className="">
            {reveiw.content}
        </p>

    </div>

   </div>

  )

}
