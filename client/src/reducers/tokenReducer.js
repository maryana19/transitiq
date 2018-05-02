import * as types from '../actions/actionTypes';

export default function tokenReducer(state={}, action) {
    if (action.type === types.TOKEN_SUCCESS) {
      return action.token;
    } else {
      return state;
    }
}