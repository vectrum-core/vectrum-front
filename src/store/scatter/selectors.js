import { getIn } from "immutable";



const root = "scatter";


export const getScatter = (state) =>
  getIn(state, [root], null);
