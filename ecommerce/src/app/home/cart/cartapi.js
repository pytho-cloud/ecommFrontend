let BASE_URL = "http://127.0.0.1:8000/user/";

export const saveCartList = async (cartItems, cartName) => {
    try {
        const response = await fetch(`${BASE_URL}add_user_wish_list/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "wish_list_name": cartName,
                "created_date": new Date().toISOString(),
                username: localStorage.getItem("user"),
                "cart_items": cartItems
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update user data: ${response.status} - ${errorText}`);
        }

        const result = await response.json();

        return result

    } catch (error) {
        console.error("Error updating user data:", error);
    }
};




export const fetchAllWishList  = async (pk) => {
    try {

        const response = await fetch(`${BASE_URL}add_user_wish_list/${pk}`);
     
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Fetch error:', error); 
    }
};


