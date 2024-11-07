import axios from "@/Api/axios";

export const verifyOtp = async (otp, updatePassword) => {
  try {
    const response = await axios.post(
      "/auth/verify",
      { ...otp, updatePassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await axios.post("/auth/otp-send", { email });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
