export const fetchUserDetails = async (username, email) => {
    try {
        console.log("This API is calling");
        let url = "http://127.0.0.1:8000/user/get_user_details/";

        const params = new URLSearchParams({
            username: username,
            email: email
        });
        
        url += `?${params.toString()}`;
        console.log(url, "This is the URL");

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error); 
    }
};

export const postUserDetails = async (username, email, phone, alternate_phone) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/user/get_user_details/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                phone: phone,
                alternate_phone: alternate_phone,
                // Add other fields as necessary
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update user data');
        }

        const result = await response.json();
        console.log("User data updated successfully:", result);
    } catch (error) {
        console.error("Error updating user data:", error);
    }
};
