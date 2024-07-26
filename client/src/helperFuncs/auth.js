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
        console.log(err);
        return err;
    }
}

export const login = async (user) => {
    try {
        const response = await axios.post('/auth/login', user, {
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
