import * as types from './actionTypes';
import api from '../api/api';
import * as jwtDecode from 'jwt-decode';

export function beginAjaxCall() {
  return {type: types.BEGIN_AJAX_CALL}
}

export function loadGtfsFilesSuccess(gtfsFiles) {
  return {type: types.LOAD_GTFS_SUCCESS, gtfsFiles};
}

export function postGtfsFileSuccess() {
  return {type: types.POST_GTFS_SUCCESS};
}

export function postGtfsFileError() {
  return {type: types.POST_GTFS_ERROR};
}

export function loadGtfsFiles(agencyId) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return api.getGtfsFiles(agencyId).then(response => {
      dispatch(loadGtfsFilesSuccess(response.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function postGtfsFile(file) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    let store = getState();
    let agencyId = store.agencyId;
    return api.postGtfs(agencyId, file).then(result => {
      dispatch(postGtfsFileSuccess());
      dispatch(loadGtfsFiles(agencyId));
    }).catch(error => {
      dispatch(postGtfsFileError());
    });
  };
}

export function deleteGtfs(gtfsId) {
  return function(dispatch, getState) {
    let store = getState();
    let agencyId = store.agencyId;
    return api.deleteGtfs(agencyId, gtfsId).then(result => {
      dispatch(loadGtfsFiles(agencyId));
    }).catch(error => {
      throw(error);
    });
  }
}

export function reloadGtfsFiles() {
  return function(dispatch, getState) {
    let store = getState();
    let agencyId = store.agencyId;
    return loadGtfsFiles (agencyId);
  }
}

export function publishGtfs(gtfsId) {
  return function(dispatch, getState) {
    let store = getState();
    let agencyId = store.agencyId;
    return api.publishGtfs(agencyId, gtfsId).then(result => {
      dispatch(loadGtfsFiles(agencyId));
    }).catch(error => {
      throw(error);
    });
  }
}

export function unpublishGtfs(gtfsId) {
  return function(dispatch, getState) {
    let store = getState();
    let agencyId = store.agencyId;
    return api.unpublishGtfs( gtfsId).then(result => {
      dispatch(loadGtfsFiles(agencyId));
    }).catch(error => {
      throw(error);
    });
  }
}

export function validateGtfs(gtfsId) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    let store = getState();
    let agencyId = store.agencyId;
    return api.validateGtfs( gtfsId).then(result => {
      dispatch(validateGtfsFileSuccess(gtfsId, result));
      dispatch(loadGtfsFiles(agencyId));
    }).catch(error => {
      dispatch(validateGtfsFileError(gtfsId));
    });
  }
}

export function selectAgency(agencyId) {
  console.log('1: actions selectAgency: ' + agencyId);
  
  return function(dispatch) {
    console.log('2: actions selectAgency: ' + agencyId);
    //dispatch(loadGtfsFiles(agencyId));
    dispatch( {type: types.SELECT_AGENCY, agencyId});
  }
}

export function validateGtfsFileSuccess(gtfsFileId, isValid) {
    return( {type: types.VALIDATE_GTFS_SUCCESS, gtfsFileId, isValid});
}

export function validateGtfsFileError(gtfsFileId) {
  return( {type: types.VALIDATE_GTFS_ERROR, gtfsFileId});
}

export function hideAlert() {
  return( {type: types.HIDE_ALERT});
}

export function login(username, password) {
  console.log('actions - login');
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return api.login( username, password)
      .then(function(token) {
          token.date_from = Date.now();
          dispatch(loginSuccess(token))
      })
      .catch(error => {
        console.log('actions - login error: ' + error)
        dispatch(loginError());
      });
  }
}

export function loginSuccess(token) {
  return function(dispatch) {
    let result = jwtDecode(token.access_token);
    let user = {
        username: result.name,
        isAdmin: result.role === 'admin',
        agencies: Array.isArray(result.agencies) ? result.agencies : new Array(result.agencies)
    };
    
    let agecyId = user.agencies[0];
    console.log('actions - loginSuccess, ' + agecyId);
    
    dispatch( {type: types.SELECT_AGENCY, agencyId: agecyId});
    dispatch( {type: types.LOGIN_SUCCESS, user});
    dispatch( {type: types.TOKEN_SUCCESS, token});
  }
}

export function loginError() {
  return( {type: types.LOGIN_ERROR});
}