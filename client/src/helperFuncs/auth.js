import axios from "@/Api/axios";

exports.signup = async (user) => {
    try {
        let response = await axios('/api/auth/signup', {
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