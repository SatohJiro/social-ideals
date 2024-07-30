import {
  REQUEST_POST_CAPTION,
  REQUEST_POST_CAPTION_SUCCESS,
  REQUEST_POST_CAPTION_FAILURE,
  REQUEST_SAVE_CAPTION,
  SAVE_CAPTION_SUCCESS,
  SAVE_CAPTION_FAILURE,
  RESET_POST_CAPTION_AND_IDEA,
  GENERATE_POST_IDEAS_REQUEST,
  GENERATE_POST_IDEAS_SUCCESS,
  GENERATE_POST_IDEAS_FAILURE,
  GENERATE_CAPTIONS_FROM_IDEA_REQUEST,
  GENERATE_CAPTIONS_FROM_IDEA_SUCCESS,
  GENERATE_CAPTIONS_FROM_IDEA_FAILURE,
} from "@/constants";

export const requestPostCaption = (payload) => ({
  type: REQUEST_POST_CAPTION,
  payload,
});

export const requestPostCaptionSuccess = (data) => ({
  type: REQUEST_POST_CAPTION_SUCCESS,
  payload: data,
});

export const requestPostCaptionFailure = (error) => ({
  type: REQUEST_POST_CAPTION_FAILURE,
  payload: error,
});

export const requestSaveCaption = (data, phoneNumber) => ({
  type: REQUEST_SAVE_CAPTION,
  payload: { data, phoneNumber },
});

export const saveCaptionSuccess = () => ({
  type: SAVE_CAPTION_SUCCESS,
});

export const saveCaptionFailure = (error) => ({
  type: SAVE_CAPTION_FAILURE,
  payload: error,
});

export const resetPostCaptionAndIdea = () => ({
  type: RESET_POST_CAPTION_AND_IDEA,
});

export const generatePostIdeasRequest = (topic) => ({
  type: GENERATE_POST_IDEAS_REQUEST,
  payload: topic,
});

export const generatePostIdeasSuccess = (ideas) => ({
  type: GENERATE_POST_IDEAS_SUCCESS,
  payload: ideas,
});

export const generatePostIdeasFailure = (error) => ({
  type: GENERATE_POST_IDEAS_FAILURE,
  payload: error,
});

export const generateCaptionsFromIdeaRequest = (idea) => ({
  type: GENERATE_CAPTIONS_FROM_IDEA_REQUEST,
  payload: idea,
});

export const generateCaptionsFromIdeaSuccess = (captions) => ({
  type: GENERATE_CAPTIONS_FROM_IDEA_SUCCESS,
  payload: captions,
});

export const generateCaptionsFromIdeaFailure = (error) => ({
  type: GENERATE_CAPTIONS_FROM_IDEA_FAILURE,
  payload: error,
});
