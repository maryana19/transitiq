import {combineReducers} from 'redux';
import gtfsFiles from './gtfsFilesReducer';
import {agencyReducer, agenciesReducer}  from './agencyReducer';
import alert from './alertReducer';
import blocking from './blockingReducer';
import token from './tokenReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  // short hand property names
  gtfsFiles: gtfsFiles,
  agencyId: agencyReducer,
  agencies: agenciesReducer,
  alert: alert,
  blocking: blocking,
  token: token,
  user: user
 
})

export default rootReducer;