import React from 'react';
import {Alert, Button} from 'react-bootstrap';

class AlertDismissable extends React.Component {
    state = {
        show: this.props.isVisible
    };
  
    handleDismiss = () => {
      this.setState({ show: false });
    }
  
    handleShow = () => {
      this.setState({ show: true });
    }
  
    render() {
      if (this.state.show) {
        return (
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <h4>{this.props.title}</h4>
            <p>
              {this.props.text}
            </p>
            <p>
              <Button onClick={this.handleDismiss}>Hide Alert</Button>
            </p>
          </Alert>
        );
      }
  
      return <Button onClick={this.handleShow}>Show Alert</Button>;
    }
  }
  
export default AlertDismissable;