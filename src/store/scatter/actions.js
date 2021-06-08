import * as AT from "./actionTypes";



export const clear = () => ({
  type: AT.CLEAR,
});

export const update = () => ({
  type: AT.UPDATE,
});

export const setScatter = (data) => ({
  type: AT.SET_SCATTER,
  payload: data,
});
