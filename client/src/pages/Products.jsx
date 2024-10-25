

import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { StoreContext } from '../context/store'
import axios from 'axios'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { MdEdit, MdViewArray } from 'react-icons/md'
import { FaTrash } from "react-icons/fa"
import { HiExclamationCircle } from "react-icons/hi"
import {toast} from "sonner"
import Error from '../components/Error'

export default function Products() {
  
  const {currentUser} = useSelector(state => state.user)

  const {url,token,products,setProducts,productLoading,productsError} = useContext(StoreContext)

  const [productIdToDelete, setProductIdToDelete] = useState(null)

  const [loader, setLoader] = useState([{},{},{},{},{},{}])

  // handleDeletePost
  const handleDeletePost = async () => {

    try
    {
      const res = await axios.delete(url + `/api/product/delete-product/${productIdToDelete}`,{headers:{token}})

      if(res.data.success)
      {
        setProducts((prev) => 
              prev.filter((post) => post._id !== productIdToDelete)
        )

        setOpen(false)

        toast.success('Post deleted successfuly')
      }

     }
    catch(error)
    {
      console.log(error.message)
    }

  }

  const [open ,setOpen] = useState(false)


  return (

    <>
      
      {productLoading && !productsError && (

        <div className="space-y-5">

          <span className="block h-4 w-60 bg-gray-300 dark:bg-green-600 rounded-full"/>

          <div className="max-w-3xl mx-auto table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
                
            <Table>
              
              <Table.Body className="divide-y font-bold uppercase">

                <Table.Row >

                  <Table.Cell>Date updated</Table.Cell>

                  <Table.Cell>Image</Table.Cell>

                  <Table.Cell>title</Table.Cell>

                  <Table.Cell>tag1</Table.Cell>

                  <Table.Cell>tag2</Table.Cell>

                  <Table.Cell>Action</Table.Cell>

                </Table.Row>

              </Table.Body>

              {loader?.map((product,index) => (

                <Table.Body>

                  <Table.Row>    

                    <Table.Cell>

                      <span className="block h-4 w-20 bg-gray-300 dark:bg-green-600 rounded-full"/>

                    </Table.Cell>

                    <Table.Cell>

                        <span className="block h-12 w-24 bg-gray-300 dark:bg-green-600 rounded-xl"/>

                    </Table.Cell>

                    <Table.Cell>

                        <span className="block h-4 w-20 bg-gray-300 dark:bg-green-600 rounded-full"/>
                    
                    </Table.Cell>

                    <Table.Cell>
                        <span className="block h-4 w-16 bg-gray-300 dark:bg-green-600 rounded-full"/>
                    </Table.Cell>

                    <Table.Cell>
                        <span className="block h-4 w-16 bg-gray-300 dark:bg-green-600 rounded-full"/>
                    </Table.Cell>

                    <Table.Cell>

                      <div className="flex item-center gap-x-2">

                        <span className="block h-6 w-6 bg-gray-300 dark:bg-green-600 rounded-full"/>

                        <span className="block h-6 w-6 bg-gray-300 dark:bg-green-600 rounded-full"/>

                        <span className="block h-6 w-6 bg-gray-300 dark:bg-green-600 rounded-full"/>

                      </div>

                    </Table.Cell>

                  </Table.Row>
                  
                </Table.Body>

              ))}

            </Table>
                  
          </div>

        </div>
        
      )}

      {!productLoading && productsError &&(

        <Error />

      )}
       
      {!productLoading && !productsError && (

          <section className="section">

            <h2 className="title text-center">Products</h2>

            <div className="max-w-3xl mx-auto table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

              {!productLoading && !productsError && (

                <div className="">
                  
                  {products?.length > 0 ? 
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

                        {products.map((product,index) => (

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
                                      onClick={() => {
                                        setOpen(true); 
                                        setProductIdToDelete(product._id)
                                      }}
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

              )}

              {productLoading && !productsError && (

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

                    {loader.map((product,index) => (

                      <Table.Body>

                        <Table.Row>

                          <Table.Cell>{index +1}.</Table.Cell>

                          <Table.Cell >

                            <div className="LoadingBg h-5 w-10"/>

                          </Table.Cell>

                          <Table.Cell>

                            <div className="LoadingBg h-5 w-10"/>  

                          </Table.Cell>

                          <Table.Cell>

                              <div className="LoadingBg h-14 w-10"/>

                          </Table.Cell>

                          <Table.Cell>

                              <div className="LoadingBg h-5 w-10"/>

                          </Table.Cell>

                          <Table.Cell>

                            <div className="LoadingBg h-5 w-10"/>

                          </Table.Cell>

                          <Table.Cell>

                            <div className="LoadingBg h-5 w-10"/>

                          </Table.Cell>

                        </Table.Row>
                      
                      </Table.Body>

                    ))}

                </Table>

              )}

              {!productLoading && productsError && (

                <div className=" mt-20">

                    <p className="">Something went wrong</p>

                    <p className=""></p>

                    <span className="btn" onClick={fetchProduct()}>retry</span>

                </div>

              )}

            </div>

          </section>

       )}

      {open && (

        <div className="w-full h-full grid place-content-center fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">

          <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-white dark:text-slate-500 transition-all duration-500 ease-in rounded">     
              
            <HiExclamationCircle size={40} className="mx-auto"/>

            <h2 className="text-xl text-center font-semibold">Are you sure  you want to delete this product?</h2>

            <div className="flex justify-between items-center">

              <button 
                className="btn"
                onClick={() => handleDeletePost()}
              >
                Yes, I'm sure 
              </button>

              <button 
                onClick={() => setOpen(false)} 
                className="btn2"
              >
                No cancel
              </button>

            </div>

          </div>

        </div>

       )}

    </>

  )

}
