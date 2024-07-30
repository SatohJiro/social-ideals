import { call, put, takeLatest } from "redux-saga/effects";
import { setAuthStatus } from "@/redux/actions/auth";
import { REQUEST_ACCESS_CODE, VERIFY_ACCESS_CODE } from "@/constants";
import {
  sendAccessCodeToPhone,
  verifyAccessCodeWithBackend,
} from "@/services/api";

function* requestAccessCodeSaga(action) {
  try {
    yield call(sendAccessCodeToPhone, action.payload);
    yield put(
      setAuthStatus({
        success: false,
        message: "Access code sent successfully",
      })
    );
  } catch (e) {
    yield put(setAuthStatus({ success: false, message: e.message }));
  }
}

function* verifyAccessCodeSaga(action) {
  try {
    const isValid = yield call(
      verifyAccessCodeWithBackend,
      action.payload.phoneNumber,
      action.payload.accessCode
    );
    if (isValid) {
      localStorage.setItem("phoneNumber", action.payload.phoneNumber);
      yield put(
        setAuthStatus({
          success: true,
          message: "Access code verified successfully",
          phoneNumber: action.payload.phoneNumber,
        })
      );
    } else {
      yield put(
        setAuthStatus({ success: false, message: "Invalid access code" })
      );
    }
  } catch (e) {
    console.log(e);
    yield put(setAuthStatus({ success: false, message: e.message }));
  }
}

function* authSaga() {
  yield takeLatest(REQUEST_ACCESS_CODE, requestAccessCodeSaga);
  yield takeLatest(VERIFY_ACCESS_CODE, verifyAccessCodeSaga);
}

export default authSaga;
