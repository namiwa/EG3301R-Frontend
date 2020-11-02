import { actionTypes } from "../actions/authAction";

const initialState = {
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      console.log("login successful");
      return {
        isLoggedIn: true,
      };
    case actionTypes.LOGIN_FAILURE:
      console.log("login failed");
      return {
        isLoggedIn: false,
      };

    case actionTypes.LOGOUT_SUCCESS:
      console.log("logout successful");
      return {
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;
