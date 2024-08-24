// pages/cart.js
import React from 'react';

const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Item 1', price: 25, quantity: 2, img: '/product1.jpg' },
    { id: 2, name: 'Item 2', price: 15, quantity: 1, img: '/product2.jpg' },
  ];

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 text-center">Image</th>
                <th className="py-2 text-center">Product</th>
                <th className="py-2 text-center">Quantity</th>
                <th className="py-2 text-center">Price</th>
                <th className="py-2 text-center" >Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t border-gray-300">
                  <td className="py-4 px-6 text-center ">
                    <img 
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover m-auto"
                    />
                  </td>
                  <td className="py-4 px-6 text-center">{item.name}</td>
                  <td className="py-4 px-6 text-center">{item.quantity}</td>
                  <td className="py-4 px-6 text-center">${item.price}</td>
                  <td className="py-4 px-6 text-center">${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">
              Total: ${calculateTotal()}
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
