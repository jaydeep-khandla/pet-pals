import axios from "@/Api/axios";

export const imageUpload = async (image) => {
  if (!image) {
    alert("Please select an image to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "bs5pbczg");
  formData.append("folder", "petProfiles");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dfehlprum/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Uploaded image URL:", response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    console.error("Error response:", error.response);
    return error;
  }
};
