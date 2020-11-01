export const actionTypes = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
};
  
export const success = () => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
    };
};