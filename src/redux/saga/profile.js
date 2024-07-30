import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUserGeneratedContents, unsaveContent } from "@/services/api";
import {
  receiveUserContents,
  unsaveContentSuccess,
  unsaveContentFailure,
} from "@/redux/actions/profile";
import { REQUEST_USER_CONTENTS, UNSAVE_CONTENT } from "@/constants";

function* fetchContents(action) {
  try {
    const contents = yield call(fetchUserGeneratedContents, action.payload);
    yield put(receiveUserContents(contents));
  } catch (e) {
    console.error(e.message);
  }
}

function* removeContent(action) {
  try {
    yield call(unsaveContent, action.payload);
    yield put(unsaveContentSuccess(action.payload));
  } catch (e) {
    yield put(unsaveContentFailure(e.message));
  }
}

function* contentSaga() {
  yield takeLatest(REQUEST_USER_CONTENTS, fetchContents);
  yield takeLatest(UNSAVE_CONTENT, removeContent);
}

export default contentSaga;
