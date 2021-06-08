import { put, select } from "redux-saga/effects";
import * as A from "./actions";
import * as S from "./selectors";



const logLocation = "sagas/scatter/sagas";

export default () => {

  const clearSaga = function* () {
    yield put(A.clear());
  }

  const updateSaga = function* (action) {
    try {
    } catch (error) {
      console.error(logLocation, "updateSaga()", error);
    }
  }

  return {
    clearSaga,
    updateSaga,
  }
}

