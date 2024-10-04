'use client'
import { fetchAllWishList } from '@/app/home/cart/cartapi';
import React, { useEffect, useState } from 'react';


export default function AllCartUI() {
  const [wishLists, setWishLists] = useState([]);

  useEffect(() => {
    const getWishLists = async () => {
      const data = await fetchAllWishList(localStorage.getItem('user'));
      if (data) {
        setWishLists(data); 
      }
    };
    getWishLists();
  }, []);

  return (
    <div className='container flex flex-wrap overflow-y-scroll h-42'> 
      {wishLists.map((wishList, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4 h-23">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{wishList.wish_list_name || "Untitled"}</div>
          </div>
          <div className="px-6 pt-4 pb-2">
            <h3>
              Created Date: <p>{new Date(wishList.created_date).toLocaleString()}</p>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
