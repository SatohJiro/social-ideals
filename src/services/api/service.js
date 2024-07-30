import { apiInstance } from "./instance";

export const generatePostCaptions = async ({
  socialNetwork,
  subject,
  tone,
}) => {
  try {
    if (!subject) throw { message: "Must input subject" };
    const response = await apiInstance.post("/generatePostCaptions", {
      socialNetwork,
      subject,
      tone,
    });
    return response.data;
  } catch (error) {
    console.error("Error generate post caption:", error);
    throw error.response.data;
  }
};

export const savePostCaption = async ({ data, phoneNumber }) => {
  const headers = {
    phone_number: phoneNumber,
  };
  try {
    const response = await apiInstance.post("/saveGeneratedContent", data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving post caption:", error);
    throw error.response.data;
  }
};

export const generatePostIdeasForTopic = async (topic) => {
  try {
    const response = await apiInstance.post("/getPostIdeas", topic);
    return response.data;
  } catch (error) {
    console.error("Error generating post ideas:", error);
    throw error.response.data;
  }
};

export const generateCapFromIdea = async (idea) => {
  try {
    const response = await apiInstance.post("/createCaptionsFromIdeas", idea);
    return response.data;
  } catch (error) {
    console.error("Error generating from ideas:", error);
    throw error.response.data;
  }
};
