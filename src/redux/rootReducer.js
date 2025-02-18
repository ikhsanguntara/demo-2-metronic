import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import courseReducer from "../app/pages/course/courseSlice";


export const rootReducer = combineReducers({
  auth: auth.reducer,
  course: courseReducer,

});

export function* rootSaga() {
  yield all([auth.saga()]);
}
