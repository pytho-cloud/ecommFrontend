// This is Product page Page 
import Product from '@/app/ui/Product/Product'
import React from 'react'

const Productpage = ({children}) => {
  return (
    <div className='container flex w-screen justify-between'>
      <Product />
    </div>
  )
}

export default Productpage
