import {combineReducers} from "redux";
import starforce from "shared/store/redux/starforce";

const rootReducer = combineReducers({
  starforce
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;