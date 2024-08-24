import React from 'react'
import Navbar from '../ui/navbar/Navbar'
import Footer from '../ui/Footer/Footer'
import User from '../ui/User/user'

function layout({ children }) {
  return (
    <div>
      <Navbar />
    


      {children}
      <Footer />

    </div>
  )
}

export default layout
