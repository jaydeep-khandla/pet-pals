import axios from "@/Api/axios";

export const fetchUser = async (userId) => {
    try {
        const response = await axios.get(`/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response;
    } catch (error) {
        console.error("fetchUser error: ", error);
        return error.response;
    }
};