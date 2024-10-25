

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { toast } from 'sonner'
import { Table } from 'flowbite-react'

export default function Coupon() {

  const {url,token} = useContext(StoreContext)

  const [formData, setFormData] = useState({})

  const [loading, setLoading] = useState(false)

  const [loadiing, setLoadiing] = useState(false)

  const [coupons, setCoupons] = useState([])


  // handleChangep
  const handleChange = (e) => {

    setFormData({...formData, [e.target.name]:e.target.value})

  }

  // handleSubmit 
  const handleSubmit = async (e) => {
  
    e.preventDefault()

    try
    {
      setLoading(true)

       const res = await axios.post(url + "/api/coupon/generate-coupon",formData ,{headers:{token}})
      
       if(res.data.success)
       {
         toast.success("coupon generated successfully")

         setFormData({})
         
         setLoading(false)

         fetchCoupons()
       }

    }
    catch(error)
    {
      console.log(error.message)

      setLoading(false)
    }

  }

  // fetchCoupons
  const fetchCoupons = async () => {

    try
    {
      setLoadiing(true)

      const res = await axios.get(url + "/api/coupon/get-coupons",{headers:{token}})

      if(res.data.success)
      {
         setLoadiing(false)

         setCoupons(res.data.coupons)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }


  useEffect(() => {

    fetchCoupons()

  },[])

  console.log(coupons)

  return (
   
    <section className="section space-y-10">

      <h2 className="title">Coupons</h2>

      <div className="space-y-5">

        <h3 className="title2">generate coupons</h3>

        <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">

          <input 
            type="number"
            name="discount"
            placeholder='discount' 
            onChange={handleChange}
            value={formData.discount}
            className="input" 
          />

          <input 
            type="number" 
            name="maxUses"
            placeholder='maximum uses'
            onChange={handleChange}
            value={formData.maxUses}
            className="input" 
          />

          <input 
            type="date" 
            name="expiresAt"
            placeholder='expiresAt (optional)'
            onChange={handleChange}
            value={formData.expiresAt}
            className="input" 
          />

          <button 
            className="btn rounded-xl"
            disabled={loading}
          >
           {loading ? 
            (
              <div className="flex gap-x-3">

                <span className="Loading"/> Loading ...

              </div>
            ) 
            : 
            ("submit")
          }
          </button>

        </form>

      </div>


      <div className="table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

        <Table>

          <Table.Head>

            <Table.HeadCell></Table.HeadCell>

            <Table.HeadCell>code</Table.HeadCell>

            <Table.HeadCell>discount</Table.HeadCell>

            <Table.HeadCell>uses</Table.HeadCell>

            <Table.HeadCell>max uses</Table.HeadCell>

            <Table.HeadCell>createdAt</Table.HeadCell>

            <Table.HeadCell>ExpiresAt</Table.HeadCell>

          </Table.Head>

          {coupons?.length  > 0 ? 
            (
              <>
                {coupons.map((coup,index) => (

                  <Table.Body key={index}>

                    <Table.Row>

                      <Table.Cell>{index + 1}.</Table.Cell>

                      <Table.Cell>{coup.code}</Table.Cell>

                      <Table.Cell>{coup.discount}%</Table.Cell>

                      <Table.Cell>{coup.uses}</Table.Cell>

                      <Table.Cell>{coup.maxUses}</Table.Cell>

                      <Table.Cell>{new Date(coup?.createdAt).toLocaleDateString}</Table.Cell>

                      <Table.Cell>{new Date(coup?.expiresAt).toLocaleDateString}</Table.Cell>

                    </Table.Row>

                  </Table.Body>

                ))}
              </>
            ) 
            : 
            (
             <p className="text-center">No coupons yet</p>
            )
          }

        </Table>
        
      </div>

    </section>

  )

}
