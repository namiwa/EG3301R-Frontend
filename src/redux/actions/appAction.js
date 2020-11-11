export const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
  VIEW_MAP: 'VIEW_MAP',
  VIEW_DATA: 'VIEW_DATA',
  VIEW_INTERIM: 'VIEW_INTERIM',
};

export const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};

export const loginFailure = () => {
  return {
    type: actionTypes.LOGIN_FAILURE,
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

export const viewMap = () => {
  return {
    type: actionTypes.VIEW_MAP,
  };
};

export const viewData = () => {
  return {
    type: actionTypes.VIEW_DATA,
  };
};

export const viewInterim = () => {
  return {
    type: actionTypes.VIEW_INTERIM,
  };
};
