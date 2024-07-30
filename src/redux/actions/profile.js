import {
  RECEIVE_USER_CONTENTS,
  REQUEST_USER_CONTENTS,
  UNSAVE_CONTENT,
  UNSAVE_CONTENT_FAILURE,
  UNSAVE_CONTENT_SUCCESS,
} from "@/constants";

export const requestUserContents = (phoneNumber) => ({
  type: REQUEST_USER_CONTENTS,
  payload: phoneNumber,
});

export const receiveUserContents = (contents) => ({
  type: RECEIVE_USER_CONTENTS,
  payload: contents,
});

export const unsaveContentRequest = (captionId) => ({
  type: UNSAVE_CONTENT,
  payload: captionId,
});

export const unsaveContentSuccess = (captionId) => ({
  type: UNSAVE_CONTENT_SUCCESS,
  payload: captionId,
});

export const unsaveContentFailure = (error) => ({
  type: UNSAVE_CONTENT_FAILURE,
  payload: error,
});
