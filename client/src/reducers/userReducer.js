import * as types from '../actions/actionTypes';
//import * as jwtDecode from 'jwt-decode';

export default function userReducer(state={}, action) {
    if (action.type === types.LOGIN_SUCCESS) {
        console.log('userReducer');
        //let user = jwtDecode(action.token);
        return action.user;
        /*{
            username: user.name,
            isAdmin: user.role === 'admin',
            agencies: Array.isArray(user.agencies) ? user.agencies : new Array(user.agencies)
        };*/
    } else {
      return state;
    }
}