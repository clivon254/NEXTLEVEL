

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import FooterComp from './components/FooterComp'

export default function App() {

  return (

   <BrowserRouter>

      <main className="w-full min-h-screen flex flex-col">

        <Header/>

         <div className="flex-1">

          <Routes>

            <Route path="/"/>

          </Routes>
          
         </div>

        <FooterComp/>

      </main>

   </BrowserRouter>

  )
  
}
