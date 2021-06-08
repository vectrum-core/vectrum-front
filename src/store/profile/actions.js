import * as AT from "./actionTypes";



export const clear = () => ({
  type: AT.CLEAR,
});

export const update = () => ({
  type: AT.UPDATE,
});

export const reAuthenticate = () => ({
  type: AT.REAUTHENTICATE,
});

export const signIn = (data) => ({
  type: AT.SIGN_IN,
  payload: data,
});

export const signUp = (data) => ({
  type: AT.SIGN_UP,
  payload: data,
});

export const setAuth = (data) => ({
  type: AT.SET_AUTH,
  payload: data,
});

export const setUserData = ({ token, guid, permissions, }) => ({
  type: AT.SET_USER_SUCCESS,
  payload: { token, guid, permissions, },
});
