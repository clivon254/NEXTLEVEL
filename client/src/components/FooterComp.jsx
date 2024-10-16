


import { Footer } from 'flowbite-react'
import React from 'react'
import { BsFacebook, BsInstagram, BsTiktok } from "react-icons/bs"
import Logo from './Logo'
import { Link } from 'react-router-dom'


export default function FooterComp() {

  return (

    <Footer className="rounded-[0] bg-secondaryLight dark:bg-secondaryDark text-textDark dark:text-textLight p-4">

      <div className="w-full max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-start gap-y-5 gap-x-10 justify-around">

            {/* logo */}
            <div className="">

              <Link to="/">

                <Logo/>

              </Link>

            </div>

            <div className="w-full sm:w-[50%] flex items-start justify-between md:justify-around">

              {/* get to know us */}
              <div className="">

                <Footer.Title title="About"/>

                <Footer.LinkGroup col>

                   <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                   >
                    Get to know us
                   </Footer.Link>

                </Footer.LinkGroup>

              </div>

              {/* socials */}
               <div className="">

                <Footer.Title title="Follow us"/>

                <Footer.LinkGroup col>

                   <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                   >
                    Get to know us
                   </Footer.Link>

                   <Footer.Link href="#" >Discord</Footer.Link>

                </Footer.LinkGroup>

              </div>

              {/* legal */}
              <div className="">

                  <Footer.Title title="Legal"/>

                  <Footer.LinkGroup col>

                    <Footer.Link href="#" >privacy policy</Footer.Link>

                    <Footer.Link href="#" >Terms &amp; conditions</Footer.Link>

                  </Footer.LinkGroup>

              </div>

            </div>

        </div>

        <Footer.Divider/>

        {/* copright */}
        <div className="w-full sm:flex sm:items-center sm:justify-between space-y-4 sm:space-y-0">

          <Footer.Copyright
            href="#"
            by="SIRE TECHNOLOGIES"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-x-6 sm:mt-0  items-center">

            <Footer.Icon href="#" icon={BsFacebook}/>

            <Footer.Icon href="#" icon={BsInstagram}/>

            <Footer.Icon href="#" icon={BsTiktok}/>

          </div>

        </div>

      </div>

    </Footer>
    
  )
  
}
