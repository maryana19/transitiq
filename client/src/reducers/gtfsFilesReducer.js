import * as types from '../actions/actionTypes';

export default function gtfsFilesReducer(state=[], action) {
    if (action.type === types.LOAD_GTFS_SUCCESS) {
      return action.gtfsFiles;
    } else if( action.type === types.SELECT_AGENCY){
      return [];
    } else {
      return state;
    }
}