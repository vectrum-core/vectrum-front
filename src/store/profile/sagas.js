import { put, select } from "redux-saga/effects";
import * as A from "./actions";
import * as S from "./selectors";



const logLocation = "sagas/profile/sagas";

export default ({ api, }) => {

  const clearSaga = function* () {
    yield put(A.clear());
  }

  const profileSignInSaga = function* (action) {
    const { payload } = action;
    try {
      const res = yield api.profileSignIn(payload);
      if (res.ok) {
        const { email } = payload;
        const { guid, token, permissions, authenticated, parent, } = res.result;
        yield put(A.setAuth({
          email, guid, token, permissions, authenticated, parent,
        }));
      }
    } catch (error) {
      yield console.error(logLocation, "profileSignInSaga()", error);
    }
  }

  const profileSignUpSaga = function* (action) {
    const { payload } = action;
    try {
      const res = yield api.profileSignUp(payload);
      if (res.ok) {
        const { email } = payload;
        const { guid, token, permissions, authenticated, parent, } = res.result;
        yield put(A.setAuth({
          email, guid, token, permissions, authenticated, parent,
        }));
      }
    } catch (error) {
      yield console.error(logLocation, "profileSignUpSaga()", error);
    }
  }

  const profileSignOutSaga = function* () {
    try {
      yield put(A.setAuth({
        guid: null,
        token: null,
        email: null,
        permissions: [],
        authenticated: false,
      }));
      //yield api.profileSignOut();
    } catch (error) {
      yield console.error(logLocation, "profileSignOutSaga()", error);
    }
    yield put(A.clear());
  }

  const updateSaga = function* () {
    try {
      const res = yield api.profileGetData();
      if (res.ok) {
        yield put(A.setAuth(res.result));
      }
    } catch (error) {
      yield console.error(logLocation, "updateSaga()", error);
    }
  }

  return {
    clearSaga,
    updateSaga,
    profileSignInSaga,
    profileSignUpSaga,
    profileSignOutSaga,
  }
}

