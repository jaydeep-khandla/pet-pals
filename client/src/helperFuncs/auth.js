import axios from "@/Api/axios";

export const signup = async (user) => {
  console.log("this is user in signup", user);
  try {
    const response = await axios.post("/auth/signup", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post("/auth/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (err) {
    // Extract and return the response object if available, else the error message
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return err.response;
    } else if (err.request) {
      // The request was made but no response was received
      console.error("No response received:", err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", err.message);
    }
    return err;
  }
};

export const setNewPassword = async (email, password) => {
  try {
    const response = await axios.post(
      "/auth/update-password",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};
