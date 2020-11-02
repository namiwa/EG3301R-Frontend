export const actionTypes = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAILURE: "LOGOUT_FAILURE",
};
  
export const loginSuccess = () => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
    };
};

export const loginFailure = () => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
    };
};

export const logoutFailure = () => {
    return {
        type: actionTypes.LOGOUT_FAIILURE,
    };
};