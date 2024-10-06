'use client';
import { fetchAllWishList, deleteUserWishList } from '@/app/home/cart/cartapi';
import React, { useEffect, useState } from 'react';
import FullScreenDialog from '../Dialog/Dialog';

export default function AllCartUI() {
  const [wishLists, setWishLists] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);  // State for controlling the dialog
  const [selectedWishList, setSelectedWishList] = useState(null);

  useEffect(() => {
    const getWishLists = async () => {
      const data = await fetchAllWishList(localStorage.getItem('user'));
      if (data) {
        setWishLists(data);
      }
    };
    getWishLists();
  }, []);

  const handleDelete = async (wishListId) => {
    const response = await deleteUserWishList(wishListId);
    if (response.status === 200) {
      setWishLists(wishLists.filter(wishList => wishList._id !== wishListId));
    }
  };

  const handleCheckout = (wishListId) => {
    setSelectedWishList(wishListId); // Set the selected wishlist for checkout
    setOpenDialog(true);  // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
    setSelectedWishList(null);  
  };

  return (
    <div className='container flex flex-wrap overflow-y-scroll h-42 '>
      {wishLists.length < 1 ? (
        <h1 className='font-bold text-4xl text-center m-auto'> Your Wish List is Empty </h1>
      ) : (
        wishLists.map((wishList) => (
          <div key={wishList._id} className="max-w-sm rounded overflow-hidden shadow-lg m-4 h-23 p-8">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{wishList.wish_list_name || "Untitled"}</div>
              <h3>
                Created Date: <p>{new Date(wishList.created_date).toLocaleString()}</p>
              </h3>
            </div>
            <div className="px-6 pt-4 pb-2 flex gap-2 justify-between">
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

      {/* Material UI Full-screen Dialog */}
      <FullScreenDialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        wishListId={selectedWishList} 
      />
    </div>
  );
}
