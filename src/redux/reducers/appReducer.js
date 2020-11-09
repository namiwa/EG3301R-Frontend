import { actionTypes } from '../actions/appAction';

const initialState = {
  isLoggedIn: false,
  isBrowseData: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      console.log('login successful');
      return {
        isLoggedIn: true,
        isBrowseData: false
      };
    case actionTypes.LOGIN_FAILURE:
      console.log('login failed');
      return {
        isLoggedIn: false,
        isBrowseData: false
      };

    case actionTypes.LOGOUT_SUCCESS:
      console.log('logout successful');
      return {
        isLoggedIn: false,
        isBrowseData: false
      };

    case actionTypes.LOGOUT_FAILURE:
      console.log('logout failed');
      return {
        isLoggedIn: true,
        isBrowseData: false
      };

      case actionTypes.VIEW_MAP:
        console.log('viewing map');
        return {
          isLoggedIn: true,
          isBrowseData: false
        };
  
      case actionTypes.VIEW_DATA:
        console.log('viewing data');
        return {
          isLoggedIn: true,
          isBrowseData: true
        };
    default:
      return state;
  }
};

export default appReducer;
