import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function agencyReducer(state='', action) {
    if (action.type === types.SELECT_AGENCY) {
      return action.agencyId;
    } else {
      return state;
    }
}

export function agenciesReducer(state=initialState.agencies, action) {
  return state;
}