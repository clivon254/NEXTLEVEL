


import { Sidebar } from 'flowbite-react'
import React, { useContext } from 'react'
import { MdAddAPhoto, MdContactPhone, MdDarkMode, MdDataset, MdHome, MdLightMode, MdPieChart, MdSaveAs, MdShop } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'

export default function DashSide() {

  const {setOpen} = useContext(StoreContext)

  const {theme} = useSelector(state => state.theme)

  const {currentUser} = useSelector(state => state.user)

  const dispatch = useDispatch()

  return (

   <Sidebar className="h-[90vh] w-full bg-white rounded-none">

    <Sidebar.Items>

        <Sidebar.ItemGroup className="flex flex-col gap-y-4">

            <Link  
              to="/"
              onClick={() => setOpen(false)}
            >

                <Sidebar.Item
                 active={window.location.pathname === '/'}
                 as="div"
                 icon={MdHome}
                >
                    Home
                </Sidebar.Item>

            </Link>

            <Link 
                to="/search"
                onClick={() => setOpen(false)}
            >

                <Sidebar.Item
                 active={window.location.pathname === '/search'}
                 as="div"
                 icon={MdShop}
                >
                    Shop
                </Sidebar.Item>

            </Link>

            <Link 
                to="/contact"
                onClick={() => setOpen(false)}
            >

                <Sidebar.Item
                 active={window.location.pathname === '/contact'}
                 as="div"
                 icon={MdContactPhone}
                >
                    contact
                </Sidebar.Item>

            </Link>

            {currentUser?.isAdmin && (
                <>
                
                    <Link 
                        to="/add-product"
                        onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                        active={window.location.pathname === '/add-product'}
                        as="div"
                        icon={MdAddAPhoto}
                        >
                            Add product
                        </Sidebar.Item>

                    </Link>

                    <Link 
                        to="/products"
                        onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                        active={window.location.pathname === '/products'}
                        as="div"
                        icon={MdSaveAs}
                        >
                           products
                        </Sidebar.Item>

                    </Link>

                    <Link 
                        to="/dashboard"
                        onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                        active={window.location.pathname === '/dashboard'}
                        as="div"
                        icon={MdPieChart}
                        >
                            Dashboard
                        </Sidebar.Item>

                    </Link>

                    <Link 
                        to="/analytic"
                        onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                        active={window.location.pathname === '/analytic'}
                        as="div"
                        icon={MdDataset}
                        >
                           Analytics
                        </Sidebar.Item>

                    </Link>

                </>

            )}

            <Sidebar.Item>

                {/* themeswitch */}
                <button 
                    className="w-8 h-8 border  rounded-full grid place-content-center"
                    onClick={() => dispatch(toggleTheme())}
                >
                    {theme === "light" ? 
                        (
                            <MdLightMode/>
                        ) 
                    : 
                        (
                           <MdDarkMode/>
                        )
                    }
                </button>

            </Sidebar.Item>

        </Sidebar.ItemGroup>

    </Sidebar.Items>

   </Sidebar>

  )

}
