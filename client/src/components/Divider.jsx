

import React from 'react'

export default function Divider({label}) {

  return (
   
    <div className="flex items-center my-2">

        <div className="flex-1 border-t border-gray-700 dark:border-gray-300"/>

        <div className="mx-4 text-sm">{label}</div>

        <div className="flex-1 border-t border-gray-700 dark:border-gray-300"/>

    </div>

 )

}
