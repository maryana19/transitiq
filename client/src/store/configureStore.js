import initialState from '../reducers/initialState';
import {createStore, applyMiddleware,compose } from 'redux';
import rootReducer from '../reducers'
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
    applyMiddleware(thunk))
  );
}
