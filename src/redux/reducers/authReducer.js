import {
  REQUEST_ACCESS_CODE,
  VERIFY_ACCESS_CODE,
  SET_AUTH_STATUS,
  RESET_AUTH_MESSAGE,
  LOGOUT,
} from "@/constants";

const initialState = {
  phoneNumber: "",
  isAuthenticated: false,
  authMessage: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ACCESS_CODE:
      return { ...state, authMessage: "Sending access code..." };
    case VERIFY_ACCESS_CODE:
      return { ...state, authMessage: "Verifying access code..." };
    case SET_AUTH_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload.success,
        authMessage: action.payload.message,
        phoneNumber: action.payload.success ? action.payload.phoneNumber : "",
      };
    case RESET_AUTH_MESSAGE:
      return { ...state, authMessage: "" };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
