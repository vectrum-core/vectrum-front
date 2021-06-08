import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import localforage from "localforage";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import rehydrate from "./rehydrate/reducers";
import profile from "./profile/reducers";
import scatter from "./scatter/reducers";



export const createRootReducer = () => {
  const rootReducer = combineReducers({
    rehydrate,
    scatter,
    profile: persistReducer(
      { key: "profile", storage: storage, stateReconciler: autoMergeLevel1, },
      profile
    ),
  });

  return rootReducer;
};

export default createRootReducer;
