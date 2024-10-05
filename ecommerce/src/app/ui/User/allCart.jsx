'use client';
import { fetchAllWishList, deleteUserWishList } from '@/app/home/cart/cartapi'; // Ensure deleteWishList is imported
import React, { useEffect, useState } from 'react';

export default function AllCartUI() {
  const [wishLists, setWishLists] = useState([]);

  useEffect(() => {
    const getWishLists = async () => {
      const data = await fetchAllWishList(localStorage.getItem('user'));
      console.log("this is my data", data);
      if (data) {
        setWishLists(data);
      }
    };
    getWishLists();
  }, []);

  const handleDelete = async (wishListId) => {
    const response = await deleteUserWishList(wishListId);
    if (response.status == 200) {
      setWishLists(wishLists.filter(wishList => wishList._id !== wishListId)); 
      console.error("Failed to delete wishlist", response.error);
    }
  };

  const handleCheckout = (wishListId) => {
    // Work pending for checkout 
    console.log("Proceeding to checkout for wishlist:", wishListId);
  
  };

  return (
    <div className='container flex flex-wrap overflow-y-scroll h-42'>
      {wishLists.length < 1 ? (
        <h1 className='font-bold text-4xl text-center m-auto'> Your Wish List is Empty </h1>
      ) : (
        wishLists.map((wishList) => (
          <div key={wishList._id} className="max-w-sm rounded overflow-hidden shadow-lg m-4 h-23">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{wishList.wish_list_name || "Untitled"}</div>
              <h3>
                Created Date: <p>{new Date(wishList.created_date).toLocaleString()}</p>
              </h3>
            </div>
            <div className="px-6 pt-4 pb-2 flex gap-2  justify-between">
              <button 
                onClick={() => handleDelete(wishList._id)} 
                className="bg-red-500 text-white rounded px-4 py-2"
              >
                Delete
              </button>
              <button 
                onClick={() => handleCheckout(wishList._id)} 
                className="bg-green-500 text-white rounded px-4 py-2"
              >
                Checkout
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
