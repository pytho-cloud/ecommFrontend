



const Section = async () => {
  


    // Function to fetch products and log them
    const fetchProducts = async () => {
     
        try {
            const response = await fetch("http://127.0.0.1:8000/api/products/");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data,'pppppppppppppppppp');
            return data.products
        } catch (error) {
           
            console.error('Fetch error:', error); // Log the error to the console
        } finally {
           
        }
    };

    const responseData  = await fetchProducts();
    console.log(responseData,'[[[[[[[[[[[[')
    return (
        <>
            <div className="container mx-auto flex flex-col items-center gap-8">
                <h1 className="text-center font-bold mt-6 p-2 text-5xl">
                    Our Latest's
                </h1>

                <div className="container mx-auto flex flex-wrap gap-4">
                {responseData?.map((product) => (
                        <div key={product._id} className="max-w-sm rounded overflow-hidden shadow-lg ease-in-out duration-300 hover:opacity-75 hover:p-1">
                            <img className="w-full" src={product.image_url} alt={product.product_name} />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{product.product_price}</div>
                                <p className="text-gray-700 text-base">
                                    {product.product_description}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{product.product_category}</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                            </div>
                        </div>
                    ))}
                
                    
                </div>
            </div>

            <div className="flex flex-col w-4/3 mx-auto pt-5">
                <h1 className="text-center text-5xl mt-10 font-bold mb-10">
                    Our Collection
                </h1>

                <div className="flex flex-wrap items-center justify-center">
                    <img className="w-1/4 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product3.jpg" alt="Product 1" />
                    <img className="w-1/3 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product3.jpg" alt="Product 3" />
                    <img className="w-1/4 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product3.jpg" alt="Product 3" />
                    <img className="w-1/4 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product4.jpg" alt="Product 1" />
                    <img className="w-1/5 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product4.jpg" alt="Background" />
                    <img className="w-1/4 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product4.jpg" alt="Product 3" />
                    <img className="w-1/4 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product3.jpg" alt="Product 1" />
                    <img className="w-1/3 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product3.jpg" alt="Product 3" />
                    <img className="w-1/4 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product3.jpg" alt="Product 3" />
                    <img className="w-1/5 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product4.jpg" alt="Background" />
                    <img className="w-1/3 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product4.jpg" alt="Product 3" />
                    <img className="w-1/4 h-auto p-2 transition-all duration-300 ease-in-out hover:opacity-75 hover:p-5" src="./product3.jpg" alt="Product 1" />
                </div>
            </div>

            <div className="container mx-auto p-10 mt-10">
                <h1 className="text-3xl p-10 mt-5 font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta natus amet architecto porro n
                </h1>
                <button className="px-7 py-2 ml-8 text-sm font-semibold rounded-full border border-purple-200 hover:text-black hover:bg-gray-200 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                    Message
                </button>
            </div>

            <h1 className="text-center text-5xl mt-10 font-bold">
                Our Services
            </h1>

            <div className="container mx-auto flex flex-wrap p-14 gap-14">
                <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden ease-in-out duration-300 hover:opacity-75 hover:py-4">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2">Discount</h2>
                        <p className="text-gray-700 text-base">
                            This is a brief description of the card content. Tailwind CSS makes it easy to style this card component with utility classes.
                        </p>
                    </div>
                </div>

                <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden ease-in-out duration-300 hover:opacity-75 hover:py-4">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2">24X7</h2>
                        <p className="text-gray-700 text-base">
                            This is a brief description of the card content. Tailwind CSS makes it easy to style this card component with utility classes.
                        </p>
                    </div>
                </div>

                <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden ease-in-out duration-300 hover:opacity-75 hover:py-4">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2">Free Delivery</h2>
                        <p className="text-gray-700 text-base">
                            This is a brief description of the card content. Tailwind CSS makes it easy to style this card component with utility classes.
                        </p>
                    </div>
                </div>

                <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden ease-in-out duration-300 hover:opacity-75 hover:py-4">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2">Quality</h2>
                        <p className="text-gray-700 text-base">
                            This is a brief description of the card content. Tailwind CSS makes it easy to style this card component with utility classes.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Section;
