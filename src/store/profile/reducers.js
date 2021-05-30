import { setIn, merge } from "immutable";
import * as AT from "./actionTypes";



const initialState = {
  guid: null,
  token: null,
  email: null,
  account: null,
  accounts: [],
  permissions: [],
  authenticated: false,
};


function profileReducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case AT.CLEAR: {
      return initialState;
    }

    case AT.REAUTHENTICATE: {
      return initialState;
    }

    case AT.SET_AUTH: {
      return merge(state, payload);
    }

    default:
      return state;
  }
}

export default profileReducer;
