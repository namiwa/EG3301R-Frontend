import { actionTypes } from '../actions/appAction';

const initialState = {
  isLoggedIn: false,
  isBrowseData: false,
  isInterim: false,
  isMap: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      console.log('login successful');
      return {
        isLoggedIn: true,
        isBrowseData: false,
        isInterim: false,
        isMap: true,
      };
    case actionTypes.LOGIN_FAILURE:
      console.log('login failed');
      return {
        isLoggedIn: false,
        isBrowseData: false,
        isInterim: false,
        isMap: false,
      };

    case actionTypes.LOGOUT_SUCCESS:
      console.log('logout successful');
      return {
        isLoggedIn: false,
        isBrowseData: false,
        isInterim: false,
        isMap: false,
      };

    case actionTypes.LOGOUT_FAILURE:
      console.log('logout failed');
      return {
        ...state,
        isLoggedIn: true,
      };

    case actionTypes.VIEW_MAP:
      console.log('viewing map');
      return {
        isLoggedIn: true,
        isBrowseData: false,
        isInterim: false,
        isMap: true,
      };

    case actionTypes.VIEW_DATA:
      console.log('viewing data');
      return {
        isLoggedIn: true,
        isBrowseData: true,
        isInterim: false,
        isMap: false,
      };

    case actionTypes.VIEW_INTERIM:
      console.log('viewing interim');
      return {
        isLoggedIn: true,
        isBrowseData: false,
        isInterim: true,
        isMap: false,
      };

    default:
      return state;
  }
};

export default appReducer;
