import axios from "@/Api/axios";

export const signup = async (user) => {
    console.log('this is user in signup', user);
    try {
        const response = await axios.post('/auth/signup', user, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response;
    } catch (err) {
        console.error(err);
        return { error: "Oops..!! Something Broke" };
    }
}

export const login = async (user) => {
    try {
        const response = await axios.post('/auth/login', user, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response;
    } catch (err) {
        console.error(err);
        return { error: "Oops..!! Something Broke" };
    }
}
