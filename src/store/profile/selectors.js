import { getIn } from "immutable";



const root = "profile";

export const isAuthenticated = (state) =>
  getIn(state, [root, "authenticated"], false);

export const getGuid = (state) =>
  getIn(state, [root, "guid"], null);

export const getToken = (state) =>
  getIn(state, [root, "token"], null);

export const getEmail = (state) =>
  getIn(state, [root, "email"], null);

export const getAccount = (state) =>
  getIn(state, [root, "account"], null);

export const getAccounts = (state) =>
  getIn(state, [root, "accounts"], []);

export const getAuthCredentials = (state) => {
  const guid = getGuid(state);
  const token = getToken(state);
  return { guid, token, };
}
