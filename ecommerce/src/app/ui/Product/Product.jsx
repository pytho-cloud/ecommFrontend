"use client";
import React, { useEffect, useState } from 'react';
import fetchProductsForProductPage from './route';
import Link from 'next/link';
const Product = ({ children }) => {
    const [productData, setProductData] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(); // Default to 'All'
    const [brands, setBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedBrands, setSelectedBrands] = useState(new Set());
    const [selectedColors, setSelectedColors] = useState(new Set());


    // Function to fetch and set data
    const fetchAndSetData = async (category = null) => {
        try {
            console.log("this is my data" ,category)
            const data = await fetchProductsForProductPage(category);
            setProductData(data.products);
            setFilteredProducts(data.products)
            setBrands(data.brands[0]?.brands || []);
            setFilteredBrands(data.brands[0]?.brands || []);

            console.log("Brands:", data.brands[0]?.brands);
      
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };
    useEffect(() => {
        fetchAndSetData(selectedCategory === 'All' ? null : selectedCategory); 

    }, [selectedCategory]);


    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };


    //Search on Brand's
    const onSearch = (e) => {
        const query = e.target.value.toLowerCase();

        setSearchQuery(query);
        console.log(searchQuery, "+===")

        const filtered = brands.filter(brand => brand.toLowerCase().includes(query));
        setFilteredBrands(filtered);
    };

    // Search on Search in Product's

    const onSearchOnProduct = (e) => {

        const query = e.target.value.toLowerCase();
        setSearchQuery(query)

        const filter = productData.filter(
            product => product.product_name.toLowerCase().includes(query) ||
                product.product_description.toLowerCase().includes(query)
        )
        setFilteredProducts(filter);
        console.log("search value", e.target.value)
    }


    //Filter product by price range 
    const onMinPriceChange = (e) => {
        const newMinPrice = Number(e.target.value);
        if (newMinPrice === 0) {
            console.log(typeof (newMinPrice))
            setMinPrice("")
        }
        setMinPrice(newMinPrice);
        applyFilters(searchQuery, newMinPrice, maxPrice);
    };

    const onMaxPriceChange = (e) => {
        const newMaxPrice = Number(e.target.value);
        if (newMaxPrice === 0) {
            setMaxPrice("")
        }
        setMaxPrice(newMaxPrice);
        applyFilters(searchQuery, minPrice, newMaxPrice);
    };


    const applyFilters = (query, minPrice, maxPrice, selectedBrands, selectedColors) => {
       
        const brands = selectedBrands || new Set();
        const colors = selectedColors || new Set();
    
        const filtered = productData.filter(product =>
            (product.product_name.toLowerCase().includes(query) ||
                product.product_description.toLowerCase().includes(query)) &&
            product.product_price >= minPrice &&
            product.product_price <= maxPrice &&
            (brands.size === 0 || brands.has(product.brand)) &&
            (colors.size === 0 || colors.has(product.color))
        );
    
        setFilteredProducts(filtered);
    };
    const onBrandChange = (brand) => {
        setSelectedBrands(prevSelectedBrands => {
            const newSelectedBrands = new Set(prevSelectedBrands);
            if (newSelectedBrands.has(brand)) {
                newSelectedBrands.delete(brand);
            } else {
                newSelectedBrands.add(brand);
            }

            applyFilters(searchQuery, minPrice, maxPrice, newSelectedBrands);
            console.log(newSelectedBrands)
            return newSelectedBrands;
        });
    };

    const onColorChange = (color) => {
        setSelectedColors(prevSelectedColors => {
            const newSelectedColors = new Set(prevSelectedColors);
            if (newSelectedColors.has(color)) {
                newSelectedColors.delete(color);
            } else {
                newSelectedColors.add(color);
            }
            applyFilters(searchQuery, minPrice, maxPrice, selectedBrands, newSelectedColors);
            return newSelectedColors;
        });
    };


    { /* Add Cart Function */}
    return (
        <div className='flex flex-col   '>
            <div className="p-5 bg-gray-200 text-2xl  font-bold">
                Product banner
                {/* This is the banner code of Product Page */}
            </div>

            <div className="container flex  ">
                <ul className='w-5/4 bg-gray-100 border border-gray-200 rounded-md p-4 space-y-4'>
                    <div>
                        <h1 className='text-sm font-semibold mb-2'>Categories</h1>
                        <li className='py-2 px-4 text-gray-700 hover:bg-gray-200 rounded cursor-pointer text-sm' onClick={() => handleCategoryClick('Men')}>
                            Men's
                        </li>
                        <li className='py-2 px-4 text-gray-700 hover:bg-gray-200 rounded cursor-pointer text-sm' onClick={() => handleCategoryClick('Women')}>
                            Women's
                        </li>
                        <li className='py-2 px-4 text-gray-700 hover:bg-gray-200 rounded cursor-pointer text-sm' onClick={() => handleCategoryClick('Kid')}>
                            Kids
                        </li>
                        <li className='py-2 px-4 text-gray-700 hover:bg-gray-200 rounded cursor-pointer text-sm' onClick={() => handleCategoryClick('All')}>
                            All
                        </li>
                    </div>

                    <div>
                        <h1 className='text-sm font-semibold mb-2 p-2'>Brands</h1>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={onSearch}
                            placeholder="Search Brands"
                            className='w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <div className='space-y-2 ml-2'>
                            {filteredBrands?.map((brand) => (
                                <label className='flex items-center' key={brand}>
                                    <input
                                        checked={selectedBrands.has(brand)}
                                        onChange={() => onBrandChange(brand)}
                                        type="checkbox"
                                        className='form-checkbox h-3 w-3 text-blue-600'
                                    />
                                    <span className='ml-2 p-1 text-sm'>{brand}</span>
                                </label>
                            ))}
                            <a href="#" className='pt-2 h-1 text-blue-700 text-xs'>1234 items more +</a>
                        </div>
                    </div>

                    {/* <div>
                        <h1 className='text-sm font-semibold mb-2'>Price Range</h1>
                        <input
                            type="number"
                            min="20"
                            max="1000"
                            step="10"
                            value={minPrice === 0 ? "" : minPrice}
                            onChange={onMinPriceChange}
                            className='w-full p-2 mb-2 border border-gray-300 rounded-md'
                        />
                        <input
                            type="number"
                            min="0"
                            max="1000"
                            step="10"
                            value={maxPrice === 0 ? "" : maxPrice}
                            onChange={onMaxPriceChange}
                            className='w-full p-2 mb-2 border border-gray-300 rounded-md'
                        />
                        <div className='flex justify-between text-gray-700'>
                            <span>${minPrice}</span>
                            <span>${maxPrice}</span>
                        </div>
                    </div> */}

                    <div>
                        <h1 className='text-sm font-semibold mb-2'>Price Range</h1>
                        <input
                            type="number"
                            min="20"
                            max="1000"
                            step="10"
                            value={minPrice === 0 ? "" : minPrice}
                            onChange={onMinPriceChange}
                            className='w-full p-2 mb-2 border border-gray-300 rounded-md'
                        />
                        <input
                            type="number"
                            min="0"
                            max="1000"
                            step="10"
                            value={maxPrice === 0 ? "" : maxPrice}
                            onChange={onMaxPriceChange}
                            className='w-full p-2 mb-2 border border-gray-300 rounded-md'
                        />
                        <div className='flex justify-between text-gray-700'>
                            <span>${minPrice}</span>
                            <span>${maxPrice}</span>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-sm font-semibold mb-2'>Colors</h1>
                        <div className='flex gap-3 flex-wrap items-center'>
                            <label className='flex items-center'>
                                <input
                                    type="checkbox"
                                    onChange={() => onColorChange('Red')}
                                    className='form-checkbox h-4 w-4 text-red-600'
                                />
                                <span className='ml-2 text-gray-700'>Red</span>
                            </label>
                            <label className='flex items-center'>
                                <input
                                    type="checkbox"
                                    onChange={() => onColorChange('Blue')}
                                    className='form-checkbox h-4 w-4 text-blue-600'
                                />
                                <span className='ml-2 text-gray-700'>Blue</span>
                            </label>
                            <label className='flex items-center'>
                                <input
                                    type="checkbox"
                                    onChange={() => onColorChange('Green')}
                                    className='form-checkbox h-4 w-4 text-green-600'
                                />
                                <span className='ml-2 text-gray-700'>Green</span>
                            </label>
                            <label className='flex items-center'>
                                <input
                                    type="checkbox"
                                    onChange={() => onColorChange('Yellow')}
                                    className='form-checkbox h-4 w-4 text-yellow-600'
                                />
                                <span className='ml-2 text-gray-700'>Yellow</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-sm font-semibold mb-2'>Discount Range</h1>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            className='w-full'
                        />
                        <div className='flex justify-between text-gray-700'>
                            <span>0%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </ul>

                {/* Product rendering */}
                <div className="container w-screen ">
                    <input type="search" placeholder='Search Here' onChange={onSearchOnProduct} value={searchQuery} className='m-5 p-2 border' />
                    <h1 className='m-5 text-2xl font-bold'>
                        Category : {selectedCategory || 'All'}
                    </h1>

                    <div className="container flex flex-wrap w-full">
                        {filteredProducts?.map((item) => (

                            <div
                                className="block max-w-[16rem]  rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white mt-6 ml-6">

                                <Link key={item._id} href={`product/${item.product_category}?product_name=${item.product_name}`}>
                                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                                        <img
                                            className="rounded-t-lg"
                                            src={item.image_url}
                                            alt={item.product_name} />
                                    </div>
                                    <div className="p-6">
                                        <h5 className="mb-2 text-xl font-medium leading-tight">{item.product_name}</h5>
                                        <p className="text-base">
                                            {item.product_description}
                                        </p>
                                    </div>
                                </Link>
                                <ul className="w-full flex  ">
                                    <li className="w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-3 dark:border-white/10">
                                        ${item.product_price}
                                    </li>
                                    <button className="w-full border-b-2 border-neutral-100 border-opacity-100 px-2 py-2 bg-blue-200 mr-2 mb-2 mt-2 rounded dark:border-white/10">
                                        Add to Cart
                                    </button>
                                </ul>
                            </div>

                        ))}
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default Product;
