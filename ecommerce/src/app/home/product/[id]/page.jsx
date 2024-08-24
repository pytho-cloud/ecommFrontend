"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useParams } from "next/navigation"; 

import fetchSingleProductsForProductPage from "@/app/api/route"; 

function ProductSinglePage() {
  const [productData, setProductData] = useState(null);

  const searchParams = useSearchParams(); 
  const params = useParams(); 
  const product_name = searchParams.get("product_name"); 
  const category_name = params.id; 
  console.log("Category:", category_name, "Product Name:", product_name);

  useEffect(() => {
    const getSingleProduct = async () => {
      if (product_name && category_name) {
        const data = await fetchSingleProductsForProductPage(product_name, category_name);
        setProductData(data.product);
        console.log(data.product.image_url, "Fetched product data");
      }
    };

    getSingleProduct();
  }, [product_name, category_name]);

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="flex p-7 container">
      <div className="container pl-2 mt-7">
        <img
          src={productData.image_url || "/product1.jpg"}
          alt={productData.name || "Image Not Found"}
        />
      </div>

      <div className="container p-2">
        <h1 className="font-bold m-3 text-2xl">
          {productData.product_name || "Product Name"}
        </h1>

        <p className="text-sm m-3 pt-2">
          Color Available: {productData.color || "N/A"}
        </p>

        <div className="text-sm m-3 pt-2">
          <h1 className="text-sm font-bold">Description</h1>
          <p>{productData.product_description || "No description available."}</p>
        </div>

        <p className="text-sm m-3">
          Category: <span>{productData.product_category}</span>
        </p>
        <p className="text-xl m-3">${productData.product_price || "0"}</p>

        <button className="border-b-2 border-neutral-100 border-opacity-100 px-2 py-2 bg-blue-200 m-3 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductSinglePage;
