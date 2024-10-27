


import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import ProductCard from '../components/ProductCard'

export default function Search() {
  
  const {products} = useContext(StoreContext)

  const [showFilter, setShowFilter] = useState(false)

  const [filteredProducts,setFilteredProducts] = useState([])

  const [tag1, setTag1] = useState([])

  const [tag2 ,setTag2] = useState([])

  const [sortType, setSortType] = useState('relevant')
  

  const toggleTag1 = (e) => {

    if(tag1.includes(e.target.value))
    {
      setTag1(prev => prev.filter(item => item !== e.target.value))
    }
    else
    {
      setTag1(prev => [...prev,e.target.value])
    }

  }

  const toggleTag2 = (e) => {

    if(tag2.includes(e.target.value))
    {
      setTag2(prev => prev.filter(item => item !== e.target.value))
    }
    else
    {
      setTag2(prev => [...prev,e.target.value])
    }

  }

  // applyFilter
  const applyFilter = () => {

    let productsCopy = products.slice()

    if(tag1.length > 0)
    {
      productsCopy = productsCopy.filter(item => tag1.includes(item.tag1))
    }

    if(tag2.length > 0)
    {
      productsCopy = productsCopy.filter(item => tag2.includes(item.tag2))
    }

    setFilteredProducts(productsCopy)
  }

  // sort Product
  const sortProduct = () => {

    let fpCopy = filteredProducts.slice()

    switch(sortType) {

      case 'low-high':
        setFilteredProducts(fpCopy.sort((a,b) => (a.discountPrice - b.discountPrice)))
        break;

      case 'high-low':
        setFilteredProducts(fpCopy.sort((a,b) => (b.discountPrice - a.discountPrice)))
        break;

      default:
        applyFilter();
        break;
    }
  }


  useEffect(() => {

    setFilteredProducts(products)

  },[products])


  useEffect(() => {

    applyFilter() 

  },[tag1,tag2])

  useEffect(() => {

    sortProduct()

  },[sortType])


  return (

    <section className="section">
       
      <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-10 ">

        {/* filter options */}
        <div className="space-y-3">

          <h2 
            className=" cursor-pointer"
            onClick={() => setShowFilter(!showFilter)}
          >
            FILTERS
          </h2>

          {/* category */}
          <div className={`border border-gray-300 dark:border-gray-500 rounded-xl p-3 ${showFilter ? "" : "hidden sm:block"}`}>

            <h3 className="">CATEGORIES</h3>

            <div className="flex flex-col gap-2 text-sm font-light">

              <div className="flex items-center gap-x-2">

                <input 
                  type="checkbox" 
                  className="w-3 h-3" 
                  value={'Male'}
                  onChange={toggleTag1}
                />

                <label className="">Male</label>

              </div>

              <div className="flex items-center gap-x-2">

                <input 
                    type="checkbox" 
                    className="w-3 h-3" 
                    value={'Female'}
                    onChange={toggleTag1}
                />

                <label className="">Female</label>

              </div>

              <div className="flex items-center gap-x-2">

                <input 
                    type="checkbox" 
                    className="w-3 h-3" 
                    value={'unisex'}
                    onChange={toggleTag1}
                />

                <label className="">unisex</label>

              </div>

            </div>

          </div>

          {/* subcategory */}
          <div className={`border border-gray-300 dark:border-gray-500 rounded-xl p-3 ${showFilter ? "" : "hidden sm:block"}`}>

            <h3 className="">TYPE</h3>

            <div className="flex flex-col gap-2 text-sm font-light">

              <div className="flex items-center gap-x-2">

                <input 
                    type="checkbox" 
                    className="w-3 h-3" 
                    value={'Topwear'}
                    onChange={toggleTag2}
                />

                <label className="">Topwear</label>

              </div>

              <div className="flex items-center gap-x-2">

                <input 
                    type="checkbox" 
                    className="w-3 h-3" 
                    value={'Bottomwear'}
                    onChange={toggleTag2}
                />

                <label className="">Bottomwear</label>

              </div>

              <div className="flex items-center gap-x-2">

                <input 
                    type="checkbox" 
                    className="w-3 h-3" 
                    value={'any'}
                    onChange={toggleTag2}
                />

                <label className="">any</label>

              </div>

            </div>

          </div>

        </div>

        {/* Right Side*/}
        <div className="flex-1 space-y-5">

          <div className="flex justify-between items-center">

            <h2 className="">ALL COLLECTION</h2>

            {/* product sort */}
            <select  
                className="text-xs rounded-xl dark:text-gray-500"
                onChange={(e) => setSortType(e.target.value)}
            >

              <option value="relevant">Sort by: Relevant</option>

              <option value="low-high">Sort by:  Low to High</option>

              <option value="high-low">Sort by: High to Low</option>

            </select>

          </div>

          {/* product map */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-3">

            {filteredProducts?.map((product,index) => (

              <ProductCard key={index} product={product} />

            ))}

          </div>

        </div>

      </div>

    </section>

  )
  
}
