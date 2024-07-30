import {
  REQUEST_ACCESS_CODE,
  VERIFY_ACCESS_CODE,
  SET_AUTH_STATUS,
  RESET_AUTH_MESSAGE,
  LOGOUT,
} from "@/constants";

export const requestAccessCode = (phoneNumber) => ({
  type: REQUEST_ACCESS_CODE,
  payload: phoneNumber,
});

export const verifyAccessCode = (phoneNumber, accessCode) => ({
  type: VERIFY_ACCESS_CODE,
  payload: { phoneNumber, accessCode },
});

export const setAuthStatus = (status) => ({
  type: SET_AUTH_STATUS,
  payload: status,
});

export const logout = () => ({
  type: LOGOUT,
});

export const resetAuthMessage = () => ({
  type: RESET_AUTH_MESSAGE,
});
