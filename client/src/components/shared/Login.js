import React from 'react';
import { Redirect } from 'react-router-dom';
import { login, loginSuccess} from '../../actions/actions'
import {connect} from 'react-redux';
import { Form, Button } from "semantic-ui-react";
import { cookieExists} from '../../selectors'
import {isLogged} from '../../selectors'

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    loginInProgress: false
  }  
  componentDidMount = () => {
    if (!this.props.isLogged){
      if (this.props.cookieExists) {
        this.setState({ loginInProgress: true })
        this.props.login();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogged !== this.props.isLogged) {
      this.setState({ loginInProgress: false })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loginInProgress: true })
    
    this.props.login(this.refs["username"].value, this.refs["password"].value)
      .then(() => {
        this.setState({ loginInProgress: false })
      })
  }

  redirectPath=() => {
    const locationState=this.props.location.state;
    const pathname=(locationState && locationState.from && locationState.from.pathname);
    console.log('Login - redirectPath: ' + pathname);
    return pathname || '/gtfs';
  }
 
    render() {
      if(this.state.loginInProgress){
        return (
          <div className='ui active centered inline loader' />
        )
      }
      if (this.props.isLogged) {
          return (
            <Redirect to={this.redirectPath()} />
            /*<Redirect to='/gtfsFiles' />*/
          );
      } else if (this.props.cookieExists) {
          return (<div/>)
      } else {
          return (
            <Form onSubmit={this.handleSubmit}>
              <Form.Group inline>
                <Form.Field>
                  <input name="username" ref="username" type="text" />
                </Form.Field>
                <Form.Field>
                  <input name="password" ref="password" type="password" />
                </Form.Field>
                <Button type='submit'>Login</Button>
            </Form.Group>
        </Form>
          )
      }
    }
}

const mapStateToLoginPageProps = (state) => (
    {
      isLogged: isLogged(state),
      cookieExists: cookieExists(state)
    }
  );
  
  const mapDispatchToLoginPageProps = (dispatch) => (
    {
      login: (username, password) => (
        dispatch(login(username, password))
        
      ),
      loginSuccess: (token) => (
        dispatch(loginSuccess(token))
      ),
      dispatch: dispatch,
    }
  );

  export default connect(
    mapStateToLoginPageProps,
    mapDispatchToLoginPageProps
  )(Login);
