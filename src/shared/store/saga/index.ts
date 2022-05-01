import {all, fork} from "redux-saga/effects";
import {starforceSaga} from "shared/store/saga/starforce";

export default function* rootSaga() {
  yield all([
      fork(starforceSaga),
    ]
  )
}