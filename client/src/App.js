import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider, connect} from 'react-redux';
import configureStore from './store/configureStore';
import {loadGtfsFiles, loginSuccess} from './actions/actions';
import GtfsContainerPage from './components/gtfs/GtfsContainerPage';
import Header from './components/shared/Header';
import Login from './components/shared/Login';
import PrivateRoute from './components/shared/PrivateRoute';
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import { Container } from "semantic-ui-react";
import {isLogged } from './selectors';

const store = configureStore();
store.subscribe(() => {
  const token = store.getState().token;
  if (store.getState().token){
    localStorage.setItem('TOKEN', JSON.stringify(store.getState().token))
  }
})
//const token = JSON.parse(localStorage.getItem('TOKEN'));

if (isLogged(store.getState()) ){
  store.dispatch(loginSuccess(store.getState().token));
}
//store.dispatch(loadGtfsFiles(store.getState().agencyId));

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    const gtfsFiles=store.gtfsFiles;
    const isLogged= !!state.token;
    return (
      /*<Provider store={store}>
        <div> 
          <Header />
          <GtfsContainerPage />
        </div>
      </Provider>*/
    
    <Provider store={store}>
      <div>
        <Header />
        <Router>
          <Container>
            <PrivateRoute path='/gtfs' component={GtfsContainerPage} />
            <Route path='/login/' component={Login} />
            <Route exact path='/' render={()=> (
              <Redirect to='/gtfs' />
            )} />
          </Container>
        </Router>
      </div>
    </Provider>
    
    )
  }
}

export default App;
