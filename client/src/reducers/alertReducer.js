import * as types from '../actions/actionTypes';

export default function alertReducer(state={success: true, text:'', title: 'Success',  show: false}, action) {
  if (action.type === types.VALIDATE_GTFS_SUCCESS) {
      return Object.assign({}, state, {
        title: action.isValid ? 'Success' : 'File is not valid!',
        text: 'File '+ action.gtfsFileId + (action.isValid ? ' is valid.' : ' is not valid.'),
        show: !action.isValid
      });
    }
    else if (action.type === types.POST_GTFS_ERROR) {
      return Object.assign({}, state, {
        title: 'Something unexpected happened.',
        text: "Couldn't  save file.",
        show: true
      });
    }
    else if (action.type === types.VALIDATE_GTFS_ERROR) {
        return Object.assign({}, state, {
          title: 'Something unexpected happened.',
          text: "Couldn't  validate file "+ action.gtfsFileId + '.',
          show: true
        });
      }
    else if (action.type === types.HIDE_ALERT) {
        return Object.assign({}, state, {
          title: '',
          text: '',
          show: false
        });
      }
    else {
      return state;
    }
}