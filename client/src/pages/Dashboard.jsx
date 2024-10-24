


import React, { useContext, useEffect, useState } from 'react'
import { MdFrontLoader, MdProductionQuantityLimits,MdViewArray,MdEdit } from "react-icons/md"
import { FaUser ,FaTrash} from "react-icons/fa"
import axios from 'axios'
import { StoreContext } from '../context/store'
import { Table } from 'flowbite-react'
import {Link} from "react-router-dom"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


export default function Dashboard() {
  
  const [stats,setStats] = useState({})

  const {url} = useContext(StoreContext)

  const data = [
    {
      title:"TOTAL PRODUCTS",
      icon:<MdProductionQuantityLimits/>,
      value:stats.totalProduct
    },
    {
      title:"TOTAL ORDERS",
      icon:<MdProductionQuantityLimits/>,
      value:stats.totalOrders
    },
    {
      title:"TOTAL USERS",
      icon:<FaUser/>,
      value:stats.totalUsers
    },
    {
      title:"PRODUCTS OUT OF STOCK",
      icon:<MdFrontLoader/>,
      value:stats.productOutStock
    },
  ]
  
  const [loading,setLoading] = useState(false)

  const [error,setError] = useState(false)

  const [loader,setLoader] = useState([{},{},{},{}])
  
  // fetchStat
  const fetchStats = async () => {

    try
    {
      setLoading(true)

      const res = await axios.post(url + "/api/product/stats")

      if(res.data.success)
      {
        setStats(res.data)

        setLoading(false)

        setError(false)
      }

    }
    catch(error)
    {
      console.log(error.message)

      setLoading(false)
    }

  }

  useEffect(() => {

    fetchStats()

  },[])

  return (

    <section className="section space-y-20">

      <h2 className="title ">Dashboard</h2>

      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {data.map((stat) => (

          <div className="border p-2 shaodow-sm space-y-2" title={stat.title}>

            <div className="flex items-center justify-between text-sm">

              <span className="">{stat.title}</span>

              {stat.icon}
            </div>

            <div className="">

              <span className="text-2xl 2xl:text-4xl font-serif">{stat.value}</span>

            </div>

            <span className="block text-xs">
              compare to previous month
            </span>

          </div>

        ))}

      </div>

      {/* last5products */}
      <div className="">

        <h2 className="title2 ">Last 5 products</h2>

        <div className="max-w-3xl mx-auto table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
              {stats?.last5Products?.length > 0 ? 
                (
                  <Table>
                    
                    <Table.Body className="divide-y font-bold uppercase">

                      <Table.Row >

                        <Table.Cell></Table.Cell>

                        <Table.Cell>Date updated</Table.Cell>

                        <Table.Cell>Image</Table.Cell>

                        <Table.Cell>title</Table.Cell>

                        <Table.Cell>tag1</Table.Cell>

                        <Table.Cell>tag2</Table.Cell>

                        <Table.Cell>Action</Table.Cell>

                      </Table.Row>

                    </Table.Body>

                    {stats?.last5Products.map((product,index) => (

                      <Table.Body>

                        <Table.Row>

                          <Table.Cell>{index +1}.</Table.Cell>

                          <Table.Cell>
                            {new Date(product.createdAt).toLocaleDateString()}
                          </Table.Cell>

                          <Table.Cell>

                            <img 
                              src={product.images[0]}
                              alt="" 
                              className="w-20 h-10"
                            />

                          </Table.Cell>

                          <Table.Cell>
                            {product.name}
                          </Table.Cell>

                          <Table.Cell>
                            {product.tag1}
                          </Table.Cell>

                          <Table.Cell>
                            {product.tag2}
                          </Table.Cell>

                          <Table.Cell>

                            <div className="flex item-center gap-x-2">

                              <span className="">

                                <Link to={`/product/${product._id}`}>

                                  <MdViewArray size={20}/>

                                </Link>

                              </span>

                              <span className="">

                                <Link to={`/edit-product/${product._id}`}>

                                    <MdEdit size={20}/>

                                </Link>

                              </span>

                              <span className="">

                                <FaTrash
                                  size={20}
                                  onClick={() => {setShowModal; setProductIdToDelete(product._id)}}
                                />

                              </span>

                            </div>

                          </Table.Cell>

                        </Table.Row>
                        
                      </Table.Body>

                    ))}

                  </Table>
                ) 
                : 
                (
                  <p className="text-center font-semibold mt-20">No products yet</p>
                )
              }
        </div>

      </div>

      {/* graph */}
      <div className="space-y-5">

        <div className="flex justify-between">

          <span className="title2">Order stast </span>

          <select name="" id="" className="">

            <option value="" className="">28 days</option>

            <option value="" className="">7days</option>

            <option value="" className="">365 days</option>

          </select>

        </div>

        <ResponsiveContainer width="100%" height={400}>

              {
                stats?.orderStats?.length > 0 ?
                (
                  <AreaChart data={stats?.orderStats}>

                    <XAxis dataKey="_id"/>

                    <YAxis/>

                    <Tooltip/>

                    <Area
                      type='monotone'
                      dataKey='Total'
                      stroke='#8884d8'
                      fill='#8884d8'
                    />

                  </AreaChart>
                )
                 :
                (
                  <img 
                    src="https://user-images.githubusercontent.com/15953522/49493502-63e21d00-f882-11e8-911c-1d7655f393e8.png" 
                    alt="No Data" 
                    className="w-full h-full "
                  />
                )
              }

        </ResponsiveContainer>

      </div>

    </section>

  )
  
}
