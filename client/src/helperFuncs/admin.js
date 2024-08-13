import axios from "@/Api/axios";

export const getAllUsers = async () => {
  try {
    const response = await axios.get("/admin/users", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getAllPets = async () => {
  try {
    const response = await axios.get("/admin/pets", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};
