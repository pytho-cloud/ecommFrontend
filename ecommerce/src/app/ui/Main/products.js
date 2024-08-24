async function getHomePageData() {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/products/", {
            cache: "no-store" // Ensures the request bypasses any caches
        });

        if (!res.ok) {
         
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
   
        console.error("Error fetching data:", error.message);
        return { error: error.message };
    }
}
