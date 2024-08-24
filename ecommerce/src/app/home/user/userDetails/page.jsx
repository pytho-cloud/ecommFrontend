"use client"
import React, { useState } from 'react';

export default function UserDetail() {
  // Define state variables for form inputs
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API or update state)
    console.log(formData);
  };

  return (
    <div className='container m-auto flex flex-wrap gap-2 flex-col'>
      <div className="container flex p-2">
      <div className='mt-2  container'>
        <label htmlFor="name" className="block text-sm font-medium text-gray-400 pt-2 text-xl ">Name</label>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">Inverse</label>

      </div>
      <div className='mt-2  container'>
        <label htmlFor="name" className="block text-sm font-medium text-gray-400 pt-2 text-xl ">Email</label>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">inverse@gmail.com</label>

      </div>

      </div>
    
      <div className='mt-2  flex p-2'>
        <div className="container">
        <label htmlFor="name" className="block text-sm font-medium text-gray-400 pt-2 text-xl">Phone</label>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">9167208204</label>
        </div>

        <div className="container">
        <label htmlFor="name" className="block text-sm font-medium text-gray-400 pt-2 text-xl">Alternate Number</label>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">9930761403</label>
        </div>
     

      </div>
      <div className='mt-2  w-4/5 p-2'>
        <label htmlFor="name" className="block text-sm font-medium text-gray-400 pt-2 text-xl">Address</label>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">TT1/009 Kannamwar Nagar -2 Vikhorli east </label>

      </div>
      <div className='mt-2  w-4/5 p-2'>
        <label htmlFor="name" className="block text-sm font-medium text-gray-400 pt-2 text-xl">Address - 2</label>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">TT1/009 Kannamwar Nagar -2 Vikhorli east </label>

      </div>

    </div>
    // <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
    //   <h2 className="text-2xl font-bold mb-4">User Details</h2>
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <div>
    //       <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleChange}
    //         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         placeholder="John Doe"
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
    //       <input
    //         type="tel"
    //         id="phone"
    //         name="phone"
    //         value={formData.phone}
    //         onChange={handleChange}
    //         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         placeholder="123-456-7890"
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         placeholder="example@example.com"
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
    //       <textarea
    //         id="address"
    //         name="address"
    //         value={formData.address}
    //         onChange={handleChange}
    //         rows="3"
    //         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         placeholder="123 Main St, Anytown, USA"
    //         required
    //       ></textarea>
    //     </div>
    //     <button
    //       type="submit"
    //       className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </div>
  );
}
