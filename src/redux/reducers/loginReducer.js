
import { actionTypes } from "../actions/loginAction";

const initialState = {
    isLoggedIn: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      console.log("login successful", initialState);
      return {
        ...state,
        isLoggedIn: true
      };
    case actionTypes.LOGIN_FAILURE:
      console.log("reducer load session success");
      return initialState;

    default:
      return state;
  }
};

export default loginReducer;