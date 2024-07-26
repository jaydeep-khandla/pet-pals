import axios from "@/Api/axios";

export const verifyOtp = async (otp) => {
    try {
        const response = await axios.post('/auth/verify', otp, {
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