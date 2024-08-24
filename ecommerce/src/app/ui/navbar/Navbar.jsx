"use client"

import React, { useEffect, useState } from 'react';

const Navbar = () => {

    const [user, setUser] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('username');
        setUser(username);
    }, []);
    return (
        <div className='w-100 p-5 flex items-center  justify-between border-b-2'>
              <h1 className='text-3xl font-bold'> 
                Inverse
            </h1>
         
            <ul class="flex m-2 ">
          
                <li class="mr-6">
                    <a class=" hover:text-blue-800" href="/home">Home</a>
                </li>
                <li class="mr-6">
                    <a class="" href="#">Mens Latest's</a>
                </li>
                <li class="mr-6">
                    <a class="" href="/home/product">Product's</a>
                </li>
                <li class="mr-6">
                    <a class="" href="#">Contact us</a>
                </li>
                <li class="mr-6">
                    <a class="" href="/home/cart">Cart</a>
                </li>
                <li class="mr-6">
                    <a class="" href="/home/user/userDetails">User     ({user ? user : "Anonymous"})</a>
                </li>
            </ul>
          
        </div>
    )
}

export default Navbar
