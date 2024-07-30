import { call, put, takeLatest } from "redux-saga/effects";
import {
  requestPostCaptionSuccess,
  requestPostCaptionFailure,
  saveCaptionSuccess,
  saveCaptionFailure,
} from "@/redux/actions/service";
import {
  GENERATE_CAPTIONS_FROM_IDEA_FAILURE,
  GENERATE_CAPTIONS_FROM_IDEA_REQUEST,
  GENERATE_CAPTIONS_FROM_IDEA_SUCCESS,
  GENERATE_POST_IDEAS_FAILURE,
  GENERATE_POST_IDEAS_REQUEST,
  GENERATE_POST_IDEAS_SUCCESS,
  REQUEST_POST_CAPTION,
  REQUEST_SAVE_CAPTION,
} from "@/constants";
import {
  generateCapFromIdea,
  generatePostCaptions,
  generatePostIdeasForTopic,
  savePostCaption,
} from "@/services/api";

function* getPostCaption(action) {
  try {
    const response = yield call(generatePostCaptions, action.payload);
    yield put(requestPostCaptionSuccess(response.data));
  } catch (e) {
    yield put(requestPostCaptionFailure(e.message));
  }
}

function* saveCaption(action) {
  try {
    const { data, phoneNumber } = action.payload;
    yield call(savePostCaption, data, phoneNumber);
    yield put(saveCaptionSuccess());
  } catch (e) {
    yield put(saveCaptionFailure(e.message));
  }
}

function* generatePostIdeas(action) {
  try {
    const response = yield call(generatePostIdeasForTopic, {
      topic: action.payload,
    });
    yield put({
      type: GENERATE_POST_IDEAS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: GENERATE_POST_IDEAS_FAILURE, payload: error.message });
  }
}

function* generateCaptionsFromIdea(action) {
  try {
    const response = yield call(generateCapFromIdea, {
      idea: action.payload,
    });
    yield put({
      type: GENERATE_CAPTIONS_FROM_IDEA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: GENERATE_CAPTIONS_FROM_IDEA_FAILURE,
      payload: error.message,
    });
  }
}

function* postCaptionSaga() {
  yield takeLatest(REQUEST_POST_CAPTION, getPostCaption);
  yield takeLatest(REQUEST_SAVE_CAPTION, saveCaption);
  yield takeLatest(GENERATE_POST_IDEAS_REQUEST, generatePostIdeas);
  yield takeLatest(
    GENERATE_CAPTIONS_FROM_IDEA_REQUEST,
    generateCaptionsFromIdea
  );
}

export default postCaptionSaga;
