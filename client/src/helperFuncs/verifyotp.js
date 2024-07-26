import axios from "@/Api/axios";

exports.verifyOtp = async (otp) => {
    try {
        const response = await axios('/api/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(otp)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}