const fetchSingleProductsForProductPage = async (pk = null, pk1 = null) => {
    try {
      let url = "http://127.0.0.1:8000/api/products";
  
      if (pk !== null && pk1 !== null) {
        const params = new URLSearchParams({ "product_name": pk, "category_name": pk1 });
        url += `?${params.toString()}`; 
        console.log(url, "This is my constructed URL");
      }
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error); 
    }
  };
  
  export default fetchSingleProductsForProductPage;
  