

import React from 'react'
import { useSelector } from 'react-redux'

export default function ThemeProvider({children}) {

    const {theme} = useSelector(state => state.theme)

    return (

       <div className={theme}>

        <div className="bg-bgLight dark:bg-bgDark">

            {children}

        </div>

       </div>

    )

}
