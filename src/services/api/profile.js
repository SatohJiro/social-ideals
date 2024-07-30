import { apiInstance } from "./instance";

export const fetchUserGeneratedContents = async ({ phoneNumber }) => {
  try {
    const response = await apiInstance.get(
      `/getUserGeneratedContents?phone_number=${phoneNumber}`
    );
    return response.data;
  } catch (error) {
    console.error("Error sending access code:", error);
    throw error.response.data;
  }
};

export const unsaveContent = async (captionId) => {
  try {
    const response = await apiInstance.post("/unsaveContent", { captionId });
    return response.data;
  } catch (error) {
    console.error("Error sending access code:", error);
    throw error.response.data;
  }
};
