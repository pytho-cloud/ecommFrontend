
let BASE_URL = "http://127.0.0.1:8000/user/"
export const fetchUserDetails = async (email, username) => {
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
                name: localStorage.getItem("user"),
                username: username,
                email: email,
                phone: phone,
                alternate_phone: alternate_phone,

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


export const postUserAddress = async () => {

    try {
        console.log("sss")
    } catch (error) {

        console.log('this is error ')
    }
}

export const fetchUserAddress = async (email) => {
    try {
        const params = new URLSearchParams({
            email: email
        });

        let addressUrl = `${BASE_URL}get_user_address/?${params.toString()}`;
        console.log("This is my constructed URL:", addressUrl);

        const response = await fetch(addressUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};