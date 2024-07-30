import { all } from "redux-saga/effects";
import authSaga from "./auth";
import serviceSaga from "./service";
import profileSaga from "./profile";
import themeSaga from "./theme";

export default function* rootSaga() {
  yield all([authSaga(), serviceSaga(), profileSaga(), themeSaga()]);
}
