import axios from "@/Api/axios";

// Function to fetch pet data
const fetchPetData = async (petId) => {
  try {
    const response = await axios.get(`/pets/${petId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("fetchPetData error: ", error);
    return null; // Or handle error as appropriate
  }
};

// Function to fetch data for multiple users
const fetchUsersByIds = async (userIds) => {
  try {
    const response = await axios.post(
      "/user/multiple",
      { ids: userIds },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data.users; // Adjust this if the response structure differs
  } catch (error) {
    console.error("fetchUsersByIds error: ", error);
    return null; // Or handle error as appropriate
  }
};

// Main function to fetch pet, user, and organization data
export const fetchAllData = async (petId, userIds) => {
  try {
    // Fetch pet data
    const petDataPromise = fetchPetData(petId);

    // Fetch user data for multiple users
    const usersDataPromise = fetchUsersByIds(userIds);

    // Wait for all data to be fetched
    const [petData, usersData] = await Promise.all([
      petDataPromise,
      usersDataPromise,
    ]);

    // Separate user data into regular users and organizations
    const [userData, orgsData] = usersData.reduce(
      ([users, orgs], user) => {
        if (user.userType === "animal_shelter") {
          orgs.push(user);
        } else {
          users.push(user);
        }
        return [users, orgs];
      },
      [[], []]
    );

    return {
      petData,
      adopterData: userData[0],
      organizationData: orgsData[0], // Fallback to organizations from user data if needed
    };
  } catch (error) {
    console.error("fetchAllData error: ", error);
    return {
      petData: null,
      adopterData: null,
      organizationData: null,
    };
  }
};
