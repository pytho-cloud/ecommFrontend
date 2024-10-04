'use client'
import React, { useEffect, useState } from 'react';
import { saveCartList } from './cartapi';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartName, setCartName] = useState("");
  useEffect(() => {
    // Retrieve cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const cartItemsCount = cartItems.length;
  console.log('this is data', cartItems)

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);

  const handleIncrement = (id) => {

    const updateCounts = cartItems.map((items) =>
      items._id = id ? { ...items, quantity: items.quantity + 1 } : items
    );
    setCartItems(updateCounts);
    console.group(updateCounts)
    localStorage.setItem('cart', JSON.stringify(updateCounts));

  }

  const handleDecrement = (id) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item._id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);

    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };


  const saveCartListHandle = async () => {
    try {
      if (cartName === "") {
        setCartName(`Your Cart ${new Date().toLocaleString()}`);
      }
      const response = await saveCartList(cartItems, cartName);
      console.log("response :" , response)
      if (response.status == 201) {
        console.log("Cart list saved successfully!")
        localStorage.removeItem('cart');
        setCartItems([]);
      
      }
    } catch (error) {
      console.error("Error saving cart list:", error);
    }
  };
  


  return (
    <div className="container mx-auto p-6">
      {cartItemsCount === 0 ? (
        <h1 className="text-2xl font-bold mb-6">Cart is Empty</h1>
      ) : (
        <div>
          <p className='text-xs font-extrathin p-1'>
            Set Cart Name Here
          </p>
          <input
            type="text"
            value={cartName}
            onChange={(e) => setCartName(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-6"
          />

          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 text-center">Image</th>
                <th className="py-2 text-center">Product</th>
                <th className="py-2 text-center">Quantity</th>
                <th className="py-2 text-center">Price</th>
                <th className="py-2 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t border-gray-300">
                  <td className="py-4 px-6 text-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover m-auto"
                    />
                  </td>
                  <td className="py-4 px-6 text-center">{item.product_name}</td>
                  <td className="py-4 px-6 text-center">

                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleDecrement(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">${item.product_price}</td>
                  <td className="py-4 px-6 text-center">${item.product_price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">
              Total: ${calculateTotal()}
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-2" onClick={saveCartListHandle}>
              Save Cart List
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
