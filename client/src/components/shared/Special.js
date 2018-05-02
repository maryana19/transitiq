import React from 'react';
import { Redirect } from 'react-router-dom';
import { login, loginSuccess} from '../../actions/actions'
import {connect} from 'react-redux';

class Special extends React.Component {
  constructor(props) {
    super(props);
    console.log('Special -constructor');
  }
    
  componentDidMount = () => {
    //console.log(this.props.match.params.token);
    console.log('Login -componentDidMount');
    //this.props.login();
    debugger;
    if (this.props.match.params.token) {
      this.props.loginSuccess(this.props.match.params.token);
    } else {
      this.props.login();
    }
  }

  redirectPath=() => {
    const locationState=this.props.location.state;
    const pathname=(locationState && locationState.from && locationState.from.pathname);
    console.log('Login - redirectPath: ' + pathname);
    return pathname || '/gtfs';
  }
 
    render() {
        return(<Redirect to='/gtfsFiles' />);
        /*if (this.props.isLogged) {
            return (
              <Redirect to='/gtfs' />
             
            );
        } else {
            return (<div/>)
        }*/
    }
}

const mapStateToSpecialProps = (state) => (
    {
      isLogged: !!state.token,
    }
  );
  
  const mapDispatchToSpecialProps = (dispatch) => (
    {
      login: () => (
        dispatch(login())
      ),
      loginSuccess: (token) => (
        dispatch(loginSuccess(token))
      ),
      dispatch: dispatch,
    }
  );

  export default connect(
    mapStateToSpecialProps,
    mapDispatchToSpecialProps
  )(Special);
