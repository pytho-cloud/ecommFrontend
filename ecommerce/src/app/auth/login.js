const loginApi = async (username, password) => {
  try {
    const url = "http://127.0.0.1:8000/login/";

    if (username &&  password) {
      const response = await fetch(url, {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          "username":username ,
          "password":password
        }),
      });

      // if (!response.ok) {
      //   throw new Error(response.error);
      // }

      const data = await response.json();
      

      return data; 
    } else {
      throw new Error("All fields are required");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};

export default loginApi;
