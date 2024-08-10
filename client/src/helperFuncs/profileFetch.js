import axios from "@/Api/axios";

export const fetchProfile = async (userId) => {
    try {
        const response = await axios.get(`/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response;
    } catch (error) {
        console.error("fetchProfile error: ", error);
        return error.response;
    }
};