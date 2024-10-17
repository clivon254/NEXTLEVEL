

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import FooterComp from './components/FooterComp'
import Home from './pages/Home'
import OnlyAdmin from './pages/OnlyAdmin'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Coupon from './pages/Coupon'
import Users from './pages/Users'
import Products from './pages/Products'
import OrderAdmin from './pages/OrderAdmin'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Search from './pages/search'
import Order from './pages/Order'
import {Toaster} from "sonner"
import ForgotPassword from './pages/ForgotPassword'


export default function App() {

  return (

   <BrowserRouter>

      <Toaster richColors/>

      <main className="w-full min-h-screen flex flex-col">

        <Header/>

         <div className="flex-1">

          <Routes>

            <Route path="/" element={<Home/>}/>

            <Route path="/contact" element={<Contact/>}/>

            <Route path="/product/:productId" element={<ProductDetails/>}/>

            <Route path="/cart" element={<Cart/>}/>

            <Route path="/checkout" element={<CheckOut/>}/>

            <Route path="/profile" element={<Profile/>}/>

            <Route path="/sign-in" element={<SignIn/>}/>

            <Route path="/order" element={<Order/>}/>

            <Route path="/forgot-password" element={<ForgotPassword/>}/>

            <Route path="/search" element={<Search/>}/>

            <Route element={<OnlyAdmin/>}>

              <Route path="/dashboard" element={<Dashboard/>}/>

              <Route path="/analytic" element={<Analytics/>}/>

              <Route path="/add-product" element={<AddProduct/>}/>

              <Route path="/products" element={<Products/>}/>

              <Route path="/edit-product/:productId" element={<EditProduct/>}/>

              <Route path="/coupon" element={<Coupon/>}/>

              <Route path="/users" element={<Users/>}/>

              <Route path="/order-admin" element={<OrderAdmin/>}/>

            </Route>

          </Routes>
          
         </div>

        <FooterComp/>

      </main>

   </BrowserRouter>

  )
  
}
