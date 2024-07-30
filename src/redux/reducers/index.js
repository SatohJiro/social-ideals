import { combineReducers } from "redux";
import authReducer from "./authReducer";
import serviceReducer from "./serviceReducer";
import profileReducer from "./profileReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer,
  profile: profileReducer,
  theme: themeReducer,
});

export default rootReducer;
