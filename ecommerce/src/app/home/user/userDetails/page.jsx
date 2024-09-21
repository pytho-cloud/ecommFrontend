"use client";
import React, { useState, useEffect } from "react";
import { fetchUserDetails, postUserDetails } from "./userdata";

export default function UserDetail() {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isForm, setIsForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        alternate_phone: "",
    });
    const [addressFormData, setAddressFormData] = useState([]);
    const [newAddressData, setNewAddressData] = useState({
        address: "",
        city: "",
        pincode: "",
    });

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const data = await fetchUserDetails("inverse", "inverse@gmail.com");
        console.log("This is data from the API:", data);

        if (data && data.data) {
            setFormData({
                name: data.data.username,
                email: data.data.email,
                phone: data.data.phone || "",
                alternate_phone: data.data.alternate_phone || "",
            });

            if (data.data.addresses) {
                setAddressFormData(data.data.addresses);
            }
        }
    };

    const handleButtonClick = () => {
        if (isEditingName) {
            handleSubmitUserDetails();
        } else {
            setIsEditingName(true);
        }
    };

    const handleSubmitUserDetails = async () => {
        await postUserDetails(formData.name, formData.email, formData.phone, formData.alternate_phone);
        getUserData(); // Refresh user data after updating
        setIsEditingName(false); // Exit editing mode after saving
    };

    const handleAddAddress = () => {
        setAddressFormData((prevAddresses) => [...prevAddresses, newAddressData]);
        setNewAddressData({
            address: "",
            city: "",
            pincode: "",
        });
        setIsForm(false);
    };

    const handleNewAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddressData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="container m-auto flex flex-wrap gap-2 flex-col">
            <div className="container flex p-2">
                <div className="mt-2 container">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 pt-2 text-xl">Name</label>
                    {isEditingName ? (
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="p-2 m-1 border border-gray-300"
                        />
                    ) : (
                        <label className="block text-sm font-medium text-gray-700">{formData.name}</label>
                    )}
                </div>
                <div className="mt-2 container">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 pt-2 text-xl">Email</label>
                    <label className="block text-sm font-medium text-gray-700">{formData.email}</label>
                </div>
            </div>
            <div className="mt-2 flex p-2">
                <div className="container">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 pt-2 text-xl">Phone</label>
                    {isEditingName ? (
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="p-2 m-1 border border-gray-300"
                        />
                    ) : (
                        <label className="block text-sm font-medium text-gray-700">{formData.phone}</label>
                    )}
                </div>
                <div className="container">
                    <label htmlFor="alternate_phone" className="block text-sm font-medium text-gray-400 pt-2 text-xl">Alternate Number</label>
                    {isEditingName ? (
                        <input
                            type="text"
                            name="alternate_phone"
                            value={formData.alternate_phone}
                            onChange={handleChange}
                            className="p-2 m-1 border border-gray-300"
                        />
                    ) : (
                        <label className="block text-sm font-medium text-gray-700">{formData.alternate_phone}</label>
                    )}
                </div>
            </div>
            <input
                type="button"
                value={isEditingName ? "Save" : "Edit"}
                onClick={handleButtonClick}
                className="ml-2 p-2 bg-blue-500 text-white rounded w-20 m-3 ml-3"
            />
            <div className="mt-4">
                <div className="inputs flex justify-end mr-2">
                    <div className="container">
                        {isForm && (
                            <div className="container mt-2 flex gap-1">
                                <label htmlFor="address" className="text-sm text-gray-400 pt-2 ml-3 text-center mt-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={newAddressData.address}
                                    onChange={handleNewAddressChange}
                                    className="p-2 m-1 border border-gray-300"
                                />
                                <label htmlFor="city" className="text-sm text-gray-400 pt-2 ml-3 text-center mt-2">City/Town</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={newAddressData.city}
                                    onChange={handleNewAddressChange}
                                    className="p-2 m-1 border border-gray-300"
                                />
                                <label htmlFor="pincode" className="text-sm text-gray-400 pt-2 ml-3 text-center mt-2">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={newAddressData.pincode}
                                    onChange={handleNewAddressChange}
                                    className="p-2 m-1 border border-gray-300"
                                />
                            </div>
                        )}
                    </div>
                    <input
                        type="button"
                        value={isForm ? "Save" : "New"}
                        onClick={isForm ? handleAddAddress : () => setIsForm(!isForm)}
                        className="ml-2 p-2 bg-blue-500 text-white rounded w-20 m-3 ml-3 flex"
                    />
                </div>
                <h2 className="text-xl font-bold">Addresses</h2>
                {addressFormData.length > 0 ? (
                    addressFormData.map((address, index) => (
                        <div key={index} className="mt-2 p-2 border rounded">
                            <p>Address: {address.address}</p>
                            <p>City/Town: {address.city}</p>
                            <p>Pincode: {address.pincode}</p>
                        </div>
                    ))
                ) : (
                    <p>No addresses added yet.</p>
                )}
            </div>
        </div>
    );
}
