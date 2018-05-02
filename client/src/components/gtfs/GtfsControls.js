import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import * as actions from '../../actions/actions';
import {connect } from 'react-redux';

class GtfsControls extends React.Component {
    renderPublishBtn = () => {
        if((this.props.gtfsFile.status === "Unpublished"
                || this.props.gtfsFile.status === "New")
             && this.props.gtfsFile.valid) {
            return(
                <Button className="bordered" icon="check square" title="Publish" inverted 
                    onClick={() => this.props.onPublishClick(this.props.gtfsFile.gtfsFileId)} />
            );
        }
    }
    renderDeleteBtn = () => {
        if(this.props.gtfsFile.status !== "Published") {
            return(
                <Button className="bordered" icon="trash" title="Delete" onClick={() => this.props.onDeleteClick(this.props.gtfsFile.gtfsFileId)} />
            );
        }
    }
    renderUnpublishBtn = () => {
        let gtfsFileId = this.props.gtfsFile.gtfsFileId;
        if(this.props.gtfsFile.status === "Published") {
            return(
                <Button icon="remove" onClick={() => this.props.onUnpublishClick(gtfsFileId)} />
            );
        }
    }
    renderValidateBtn = () => {
        let gtfsFileId = this.props.gtfsFile.gtfsFileId;
        if(this.props.gtfsFile.status === "New" && this.props.gtfsFile.valid === null) {
            return(
                <Button bordered icon="check" onClick={() => this.props.onValidateClick(gtfsFileId)} />
            );
        }
    }
    render() {
        return (
            <Button.Group basic>
               <Button icon="info" title="Details" />
                {this.renderValidateBtn()}
                {this.renderPublishBtn()}
                {this.renderUnpublishBtn()}
                {this.renderDeleteBtn()}
            </Button.Group>
        );
    }
}

const mapDispatchToGtfsControlsProps = (dispatch) => (
    {
      onDeleteClick: (gtfsId) => (
        dispatch(actions.deleteGtfs(gtfsId))
      ),
      onPublishClick: (gtfsId) => (
        dispatch(actions.publishGtfs(gtfsId))
      ),
      onUnpublishClick: (gtfsId) => (
        dispatch(actions.unpublishGtfs(gtfsId))
      ),
      onValidateClick: (gtfsId) => (
        dispatch(actions.validateGtfs(gtfsId))
      ),
      dispatch: dispatch,
    }
  );

export default connect(null, mapDispatchToGtfsControlsProps) (GtfsControls);