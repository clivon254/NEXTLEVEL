

import React, { useContext } from 'react'
import { FcGoogle } from "react-icons/fc"
import { StoreContext } from '../context/store'
import { GoogleAuthProvider, signInWithPopup,getAuth } from "firebase/auth"
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInSuccess } from '../redux/user/userSlice'
import axios from "axios"
import { toast } from 'sonner'

export default function OAuth() {

 
    const {url, setToken} = useContext(StoreContext)

    const auth = getAuth(app)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleGoogleClick
    const handleGoogleClick = async () => {

        try
          {
              const provider = new GoogleAuthProvider()

              provider.setCustomParameters({prompt:'select_account'})

              const resultsFromGoogle = await signInWithPopup(auth , provider)

              let data = {
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl:resultsFromGoogle.user.displayName
              }

            const res = await axios.post(url + '/api/auth/google',data)
            
            if(res.data.success)
            {
              dispatch(signInSuccess(res.data.rest))

              localStorage.setItem("token", res.data.token)

              setToken(res.data.token)

              navigate('/')

              toast.success("you have sign in successfully")
            }

  
        }
        catch(error)
        {
          console.log(error)
        }

    }


  return (

   <button 
      onClick={handleGoogleClick}
      className="w-full flex flex-row-reverse justify-center items-center gap-x-5 border border-gray-700 dark:border-gray-300 px-4 py-2 rounded-xl "
   >

     Sign in with Google <FcGoogle/>

   </button>

  )

}
