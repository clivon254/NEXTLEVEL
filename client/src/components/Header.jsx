


import React, { useContext } from 'react'
import {Avatar, Drawer, Dropdown} from "flowbite-react"
import { useDispatch, useSelector } from 'react-redux'
import { StoreContext } from '../context/store'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { MdClose, MdContactPage, MdContactPhone, MdDarkMode, MdHome, MdLightMode, MdMenu, MdSearch, MdShop, MdShoppingCart } from "react-icons/md"
import { toggleTheme } from '../redux/theme/themeSlice'
import DashSide from './DashSide'
import { signOutSuccess } from '../redux/user/userSlice'
import {toast} from "sonner"


export default function Header() {

  const {currentUser} = useSelector(state => state.user)

  const {theme} = useSelector(state => state.theme)

  const {open, setOpen} = useContext(StoreContext)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // handleSignout
  const handleSignOut = () => {

    try
    {
      dispatch(signOutSuccess())

      localStorage.removeItem("token")

      toast.success("you have signed out successfully")

      navigate('/')
    }
    catch(error)
    {
      console.log(error)
    }

  }

  return (

    <>

      <header className="w-full mx-auto p-5 py-8">
        
        <div className="w-full flex items-center justify-between">

          {/* toggleMenu */}
          <div className="md:hidden">

            {open ? 
              (
                <MdClose 
                  size={30}
                  onClick={() => setOpen(false)} 
                  className="cursor-pointer font-bold"
                />
              ) 
              : 
              (
                <MdMenu
                  size={30}
                  onClick={() => setOpen(true)} 
                  className="cursor-pointer"
                />
              )
            }

          </div>

          {/* logo */}
          <div className="hidden md:block">

            <Logo/>

          </div>

          {/* nav */}
          <nav className="hidden md:block">

            <div className="flex items-center gap-x-10 lg:gap-x-24 2xl:gap-x-30">

                <NavLink to="/" className={({isActive}) => isActive ? "active-link" : "active"}>
                   <MdHome size={20}/> Home
                </NavLink>

                <NavLink to="/search" className={({isActive}) => isActive ? "active-link" : "active"}>
                    <MdShop size={20}/>Shop
                </NavLink>

                <NavLink to="/contact" className={({isActive}) => isActive ? "active-link" : "active"}>
                 <MdContactPhone size={20}/> Contact
                </NavLink>

            </div>

          </nav>
          
          {/* actions */}
          <div className="flex items-center gap-x-2">

            {/* search */}
            <div className="md:hidden">

              <Link 
               to="/search"
               classNAME="cursor-pointer"
              >

                <MdSearch size={24}/>

              </Link>

            </div>
            
            {/* themeswitch */}
            <button 
                className="hidden w-8 h-8 border  rounded-full md:grid place-content-center"
                onClick={() => dispatch(toggleTheme())}
            >
              {theme === "light" ? 
                (
                    <MdLightMode />
                ) 
              : 
                (
                  <MdDarkMode/>
                )
              }
            </button>

            {/* cart */}
            <div className="">

              <Link 
                to="/cart"
                classNAME="cursor-pointer"
              >

                <MdShoppingCart size={24}/>

              </Link>

            </div>

            {/* dropdown */}
            <div className="">
              {currentUser ? 
                (
                <Dropdown
                  inline
                  arrowIcon={false}
                  label={
                    <Avatar
                      alt="user"
                      img={currentUser?.profilePicture}
                      rounded
                      className="shadow-md"
                    />
                  }
                >

                  <Dropdown.Header>

                    <span className="block text-sm">{currentUser?.username}</span>

                    <span className="block text-sm">{currentUser?.email}</span>

                  </Dropdown.Header>

                  <Dropdown.Divider/>

                  {currentUser.isAdmin && (

                    <>

                      <Link to='/dashboard'>

                        <Dropdown.Item>Dashboard</Dropdown.Item>
                    
                      </Link>

                      <Link to='/analytic'>

                        <Dropdown.Item>Analytics</Dropdown.Item>
                  
                      </Link>

                      <Link to='/products'>

                        <Dropdown.Item>Products</Dropdown.Item>
                  
                      </Link>

                      <Link to='/add-product'>

                        <Dropdown.Item>Add Product</Dropdown.Item>
                  
                      </Link>

                      <Link to='/order-admin'>

                        <Dropdown.Item>Order Admin</Dropdown.Item>
                  
                      </Link>

                  </>
                  )}


                  <Link to='/order'>

                    <Dropdown.Item>Orders</Dropdown.Item>
                  
                  </Link>

                  <Link to='/profile'>

                    <Dropdown.Item>Profile</Dropdown.Item>
                  
                  </Link>
                
                  <Dropdown.Divider/>

                  <Dropdown.Item onClick={handleSignOut}>
                    Sign out
                  </Dropdown.Item>

                </Dropdown>
                ) 
                : 
                (
                  <Link to="/sign-in">

                    <button className="btn rounded-full">
                      sign in
                    </button>

                  </Link>
                )
              }
            </div>

          </div>

        </div>

      </header>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        className='md:hidden '
      >

            <span className="flex justify-end">

                <MdClose 
                    size={30}
                    onClick={() => setOpen(false)} 
                    className="cursor-pointer font-bold"
                />
                
            </span>

            <Drawer.Items>

              <DashSide/>

            </Drawer.Items>

      </Drawer>

    </>

  )

}
