import { apiInstance } from "./instance";

export const sendAccessCodeToPhone = async (phoneNumber) => {
  try {
    const response = await apiInstance.post("/createNewAccessCode", {
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending access code:", error);
    throw error.response.data;
  }
};

export const verifyAccessCodeWithBackend = async (phoneNumber, accessCode) => {
  try {
    const response = await apiInstance.post("/validateAccessCode", {
      phoneNumber,
      accessCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying access code:", error);
    throw error.response.data;
  }
};
