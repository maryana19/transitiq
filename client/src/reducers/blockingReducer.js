import * as types from '../actions/actionTypes';

function actionTypeEndsInSuccess(type){
  return type.substring(type.length -8 ) == '_SUCCESS';
}

export default function blockingReducer(state=false, action) {
  if (action.type === types.BEGIN_AJAX_CALL) {
        return true;
      }
  if (action.type === types.VALIDATE_GTFS_ERROR 
      || action.type === types.POST_GTFS_ERROR) {
    return false;
  }
  else if (actionTypeEndsInSuccess(action.type)) {
      return false;
    }
  else {
    return state;
  }
}