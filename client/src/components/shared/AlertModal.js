import React from 'react';
import {Modal} from 'semantic-ui-react';

class AlertModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: this.props.show
    };
  }

  handleHide() {
    this.props.onHideClick();
  }

  render() {
    return (
        <Modal 
          show={this.props.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title" 
          header= {this.props.title}
          content={this.props.text}
        >
        </Modal>
    );
  }
}

export default AlertModal;

