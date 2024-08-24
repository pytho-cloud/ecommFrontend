import React from 'react'
import Navbar from '../ui/navbar/Navbar'
import Main from '../ui/Main/Main'
import Section from '../ui/Main/Section'
import layout from './layout'

function  Home() {
  return (
    <div>
      <layout>
      <Main/>
      <Section/>
      </layout>  
    </div>
  )
}

export default  Home
