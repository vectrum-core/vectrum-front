import * as AT from "./actionTypes";



const initialState = null;
let t = {
  identity: null,
  network: null,
  isExtension: null,
  wallet: null,
}


function scatterReducer(state = initialState, action = {},) {
  const { type, payload } = action;

  switch (type) {
    case AT.CLEAR: {
      return initialState;
    }

    case AT.SET_SCATTER: {
      return payload;
    }

    default:
      return state;
  }
}

export default scatterReducer;
