





import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { Alert } from 'flowbite-react'
import axios from "axios"
import { useParams } from 'react-router-dom'


export default function ResetPassword() { 

    const {url} = useContext(StoreContext)
    
    const [formData,setFormData] = useState({})

    const [Loading, setLoading] = useState(false)

    const [resetSuccess, setResetSuccess] = useState(false)

    const [error, setError] = useState(false)

    const {token} = useParams()

    // handleChange
    const handleChange = (e) => {

        setFormData({...formData,[e.target.name]:e.target.value})

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            setLoading(true)

            const res = await axios.post(url + `/api/auth/forgot-password/${token}`,formData)

            if(res.data.success)
            {
                setResetSuccess(true)

                setError(false)

                setLoading(false)

                setFormData({})
            }
            else
            {
                setResetSuccess(false)

                setError(true)

                setLoading(false)

                console.log(res.data.message)
            }

        }
        catch(error)
        {
            console.log(error.message)

            setEmailSuccess(false)

            setError(true)

            setLoading(false)
        }

    }

    return (

      <section className="section h-[60vh]">

        <div className="w-full h-full flex flex-col gap-y-10 items-center justify-center">

            <h2 className="text-xl md:text-2xl lg:text-4xl font-serif">Reset Password</h2>

            <form onSubmit={handleSubmit} className="w-full space-y-5 max-w-xl mx-auto">

                <input 
                    type="password" 
                    name="password"
                    placeholder='password'
                    className="input" 
                    required
                    value={formData.password}
                    onChange={handleChange}
                />

                <input 
                    type="email" 
                    name="confirmPassword"
                    placeholder='confirmPassword'
                    className="input" 
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn w-full rounded-xl"
                >

                    {Loading ? 
                     (
                        <>
                            <span className="flex items-center gap-x-3 justify-center">

                                    <span className="Loading"/> Loading ...

                            </span>
                        </>
                     ) 
                     :
                     (
                        "onSubmit"
                     )
                    }

                </button>
           
                {emailSuccess && (

                  <Alert color="success">Email sent success fully</Alert>

                )}

                {error && (

                  <Alert color="failure">There is not account for this email</Alert>

                )}

         
             </form>

        </div>

      </section>

    )

}

