import { combineReducers } from "redux";
import payReducer from "./payReducer";
import payStatusReducer from "./payStatusReducer";
import updateTransaction from "./updateTransaction";
import userInfo from "./userInfo";
export default combineReducers({
  payment: payReducer,
  transaction: updateTransaction,
  payment_status: payStatusReducer,
  user_info: userInfo,
});

