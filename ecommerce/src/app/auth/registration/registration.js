const regisrationApi = async (username, email, password) => {
    try {
      const url = "http://127.0.0.1:8000/register/";
  
      if (username && email && password) {
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            username,
            email,
            password,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        console.log("success fully logn", data.status)
        return data; 
      } else {
        throw new Error("All fields are required");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; 
    }
  };
  
  export default regisrationApi;
  