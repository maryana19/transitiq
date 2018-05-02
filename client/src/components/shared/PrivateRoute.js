import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {isLogged} from '../../selectors';

class PrivateRoute extends React.Component {
    render() {
        return (
            this.props.isLogged ? (
                React.createElement(this.props.component, this.props)
            ) : (
                <Route render={() =>  <Redirect to={{pathname: '/login', state: {from: this.props.location} }} />} />
            ) 
        )
    }
}

const mapStateToGtfsContainerPageProps = (state) => (
    {
      isLogged: isLogged(state),
    }
  );
  
export default connect(
    mapStateToGtfsContainerPageProps,
)(PrivateRoute);

/*const PrivateRoute = ({ component,isLogged, ...rest }) => (
    <Route {...rest} render={(props) => (
      isLogged ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }} />
      )
    )} />
  );
  
  export default PrivateRoute;*/