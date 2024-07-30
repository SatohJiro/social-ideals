import { TOGGLE_THEME } from "@/constants";
import { takeLatest } from "redux-saga/effects";

function* toggleThemeSaga() {}

export default function* watchToggleTheme() {
  yield takeLatest(TOGGLE_THEME, toggleThemeSaga);
}
