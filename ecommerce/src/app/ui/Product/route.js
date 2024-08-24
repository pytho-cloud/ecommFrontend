const fetchProductsForProductPage = async (pk = null) => {
    try {
        console.log("this is api is calling")
        let url = "http://127.0.0.1:8000/api/products/";

        
        if (pk !== null )  {
          
            console.log("if is executed");
            url += `${pk}`;
            console.log(url,"this is url ")
        }
     
        const response = await fetch(url);
     
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error); // Log the error to the console
    }
};

export default fetchProductsForProductPage;
