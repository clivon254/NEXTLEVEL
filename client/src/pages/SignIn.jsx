

import React, { useContext, useState } from 'react'
import OAuth from '../components/OAuth'
import Divider from '../components/Divider'
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import { StoreContext } from '../context/store'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'



export default function SignIn() {

  const {error, loading,currentUser} = useSelector(state => state.user)

  const {url,token,setToken} = useContext(StoreContext)
  
  const [formData, setFormData] = useState({})

  const [Loading, setLoading] = useState(false)

  const [currentState, setCurrentState]= useState('Sign In')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // handleChange
  const handleChange = (e) => {
  
    setFormData({...formData,[e.target.name]:e.target.value })

  }

  //handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {

      if(currentState === 'Sign In')
      {

        dispatch(signInStart())

        const res = await axios.post(url + "/api/auth/sign-in",formData)

        if(res.data.success)
        {
          dispatch(signInSuccess(res.data.rest))

          setFormData({})

          localStorage.setItem("token", res.data.token)

          setToken(res.data.token)

          toast.success("You have successfully sign in")

          navigate('/')
        }
        else
        {
            dispatch(signInFailure(res.data.message))

            console.log(res.data.message)
        }
      }
      else
      {
        
          const res = await axios.post(url + "/api/auth/sign-up",formData)

          if(res.data.success)
          {
            
            setCurrentState('Sign In')

            toast.success("You have successfully signed up")


            setFormData({})

          }
          else
          {
            console.log(error.message)
          }

      }

    }
    catch(error)
    {
      console.log(error.message)

      dispatch(signInFailure(error.message))

    }

  }

  console.log(formData)

  return (
   
   <section className="section">

      <div className="h-full w-full flex flex-col items-center justify-center">

        <h2 className="font-serif text-3xl xl:text-2xl">{currentState}</h2>

        <div className="w-full max-w-xl max-auto space-y-10 py-10">

          <OAuth />

          <Divider label="or"/>

          <form onSubmit={handleSubmit} className="space-y-4">
           
            {currentState === "Sign In" ? 
                (null) 
                : 
                (
                  <>
                    {/* username */}
                    <div className="">

                      <input 
                          type="text" 
                          placeholder='username'
                          name="username"
                          required
                          className="input peer"
                          value={formData.username}
                          onChange={handleChange}
                      />

                    </div>
                  </>
                )
            }
            
            {/* email */}
            <div className="">

              <input 
                  type="email" 
                  placeholder='name@example.com'
                  name="email"
                  required
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                />

            </div>

            {/* password */}
            <div className="">

              <input 
                    type="password" 
                    placeholder='password'
                    name="password"
                    required
                    className="input"
                    value={formData.password}
                    onChange={handleChange}
                />

            </div>


            {/* button */}
            <button 
                onSubmit={handleSubmit}
                className="w-full btn rounded-xl"
                disabled={loading}
            >
              {loading 
                ? 
                (
                  <>
                      <span className="flex items-center gap-x-3 justify-center">

                              <span className="Loading"/> Loading ...

                      </span>
                  </>
                ) 
                : 
                (
                  currentState === 'Sign In' ? "Sign In" : "Sign Up"
                )
              }

            </button>

            {/* wordings */}
            <div className="flex items-center justify-between text-xs font-semibold">
            
              {currentState === "Sign In" ? 
                (
                  <span className="">
                        Don't have an account? 
                        <span 
                            onClick={() => setCurrentState('Sign Up')}
                            className="cursor-pointer hover:underline text-primaryLight dark:text-primaryDark"
                        >
                          click here
                        </span> 
                  </span>
                ) 
                : 
                (
                  <span className="">
                        Already have an account? 
                        <span 
                            onClick={() => setCurrentState('Sign In')}
                            className="cursor-pointer hover:underline text-primaryLight dark:text-primaryDark"
                        >
                          click here
                        </span> 
                  </span>
                )
              }
              
            {currentState === "Sign In" && (

                <Link to='/forgot-password'>

                   <span className="text-primaryLight dark:text-primaryDark hover:underline cursor-pointer">forgot password?</span>

                </Link>

            )}

            </div>


          </form>

        </div>

      </div>

   </section>

  )
  
}
