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

export const fetchCounts = async () => {
  try {
    const [userCountResponse, petCountResponse, adoptionCountResponse] = await Promise.all([
      axios.get("admin/users/count", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }),
      axios.get("admin/pets/count", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }),
      // axios.get("/adoption-applications/count")
    ]);

    return {
      ...userCountResponse.data,
      ...petCountResponse.data,
      adoptionCount: adoptionCountResponse?.data,
    };
  } catch (error) {
    // Handle errors here
    console.error("Error fetching counts:", error);
    throw error;
  }
};