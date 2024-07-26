import axios from "@/Api/axios";

export const signup = async (user) => {
    console.log('this is user in signup', user);
    try {
        const response = await axios.post('/auth/signup', user, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const login = async (user) => {
    try {
        const response = await axios('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}
