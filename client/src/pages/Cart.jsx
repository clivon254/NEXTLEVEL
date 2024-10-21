

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { FaTrash } from 'react-icons/fa'
import SlideProducts from '../components/SlideProducts'
import { Table, TableRow } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { MdArrowCircleRight, MdArrowRight, MdArrowRightAlt } from 'react-icons/md'

export default function Cart() {

    const {getTotalCartAmount,cartData,products} = useContext(StoreContext)

    const navigate = useNavigate()


  return (

    <section className="section">

      {cartData?.length > 0 ? 
        <div className="w-full">

            <h2 className="title ">Your Cart</h2>

            <div className="w-full space-y-14">

              {/* table */}
              <div className="table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

                <Table>

                  <Table.Body>

                    <Table.Row className="text-sm uppercase font-semibold">

                      <Table.Cell>image</Table.Cell>

                      <Table.Cell>product</Table.Cell>

                      <Table.Cell>quantity</Table.Cell>

                      <Table.Cell>subtotal</Table.Cell>

                      <Table.Cell>Remove</Table.Cell>

                    </Table.Row>

                  </Table.Body>
              
                  {cartData.map((item,index) => {

                    const productData = products.find((product) => product._id === item._id)

                    return (

                      <Table.Body>

                        <Table.Row className="">

                          {/* product  image*/}
                          <Table.Cell className="">

                            <div className="flex items-start ">

                              <img 
                                src={productData?.images[0]} 
                                alt="image" 
                                className="min-w-20 h-20" 
                              />

                            </div>

                          </Table.Cell>

                          <Table.Cell>

                             <div className="">

                                <p className="text-xs sm:text-lg font-medium">{productData?.name}</p>

                                <div className="flex flex-col  items-start gap-5 mt-2">

                                  <p className="">{productData?.discountPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}</p>

                                  <p className="font-bold">Size : <span className="size size-active">{item?.size}</span></p>

                                </div>

                              </div>

                          </Table.Cell>
 
                          {/* update quantity */}
                          <Table.Cell>

                            <div className="grid place-content-center">

                              <div className="">

                                <span className="border p-1 text-xl font-bold cursor-pointer">-</span>
                                <span className="border p-1 text-xl font-bold ">{item.quantity}</span>
                                <span className="border p-1 text-xl font-bold cursor-pointer">+</span>

                              </div>

                            </div>

                          </Table.Cell>
                           
                           {/* total */}
                          <Table.Cell>

                            <div className="">
                              {(item.quantity * productData?.discountPrice).toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}
                            </div>

                          </Table.Cell>

                          {/* delete */}
                          <Table.Cell>

                            <div className="grid place-content-center cursor-pointer">

                              <FaTrash size={20} className="text-red-600"/>

                            </div>

                          </Table.Cell>

                        </Table.Row>

                      </Table.Body>

                    )

                  })}

                </Table>

              </div>

              {/* cartTotals */}
              <div className="w-full space-y-7">
                  
                {/* totals */}
                <div className="">

                    <Table>

                      <Table.Body>

                        <Table.Row>

                           <Table.Cell colSpan={2} className="title2">CART TOTALS</Table.Cell>
                       
                        </Table.Row>

                      </Table.Body>

                      <Table.Body>

                        <Table.Row>

                          <Table.Cell className="text-xl font-semibold">Subtotals</Table.Cell>

                          <Table.Cell className="font-semibold">
                            {(getTotalCartAmount()).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                          </Table.Cell>

                        </Table.Row>

                        <TableRow>

                          <Table.Cell colSpan={2}>
                            
                            <button 
                              className="w-full btn2 rounded-xl"
                              onClick={() => navigate('/checkout')}
                            >
                              PROCEED TO CHECKOUT
                            </button>

                          </Table.Cell>

                        </TableRow>

                      </Table.Body>

                    </Table>

                </div>

                {/* coupons */}
                <div className="space-y-3">

                  <h3 className="title2">Apply coupon</h3>

                  <input 
                     type="text" 
                     className="input"
                     placeholder='code'
                  />

                  <button className="btn rounded-xl">
                    submit
                  </button>

                </div>

              </div>

              {/* featured products */}
              <div className="space-y-5">

                <h3 className="title2">featured products</h3>

                <SlideProducts products={products}/>

              </div>

            </div>

        </div>
        :
        <div className="grid place-content-center ">

          <div className="flex flex-col item-center gap-y-5">
            
            <p className="text-2xl font-serif text-center">Your cart is empty</p>

            <button 
                className="flex items-center gap-x-5 btn rounded-xl"
                onClick={() => navigate('/search')}
            >
              Return to shop <span className="animate-ping"><MdArrowRightAlt size={30}/></span>
            </button>

          </div>

        </div>
      }
    </section>

  )

}
