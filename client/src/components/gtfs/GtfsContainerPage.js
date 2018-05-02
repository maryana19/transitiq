import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import GtfsTable from './GtfsTable'
import GtfsUpload from './GtfsUpload'
import LinkMenu from '../shared/LinkMenu';
import AlertModal from '../shared/AlertModal'
import {postGtfsFile, hideAlert, login, loadGtfsFiles} from '../../actions/actions'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import { Container, Grid } from "semantic-ui-react";
import {isLogged} from '../../selectors'

class GtfsContainerPage extends React.Component {
  constructor(props) {
    super(props);
    const OLD_PORTAL_URL = process.env.OLD_PORTAL_URL;
    console.log('OLD_PORTAL_URL: ' + OLD_PORTAL_URL)
  }
  
  componentDidMount = () => {
      this.props.getGtfsFiles(this.props.agencyId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.agencyId !== this.props.agencyId) {
      this.props.getGtfsFiles(nextProps.agencyId)
    }
  }

  render() {
    return(
      <div>
          <LinkMenu />
          <BlockUi tag="div" blocking={this.props.blocking} color="#337ab7" >
            <AlertModal show={this.props.alertVisible} title={this.props.alertTitle}
              text={this.props.alertText} onHideClick={this.props.hideAlert} />
            <GtfsUpload postGtfs={this.props.postGtfs} />
            <GtfsTable gtfsFiles={this.props.gtfsFiles} isAdmin={this.props.isAdmin} ></GtfsTable>
          </BlockUi>
      </div>
    );
  }
}

const mapStateToGtfsContainerPageProps = (state) => (
    {
      isLogged: isLogged(state),
      gtfsFiles: state.gtfsFiles,
      alertTitle: state.alert.title,
      alertText: state.alert.text,
      alertVisible: state.alert.show,
      alertSuccess: state.alert.success,
      blocking: state.blocking,
      agencyId: state.agencyId,
      isAdmin: state.user.isAdmin
      //selectedDirection: state.direction.directionId,
    }
  );
  
  const mapDispatchToGtfsContainerPageProps = (dispatch) => (
    {
      postGtfs: (file) => (
        dispatch(postGtfsFile(file))
      ),
      hideAlert: () => (
        dispatch(hideAlert())
      ),
      login: () => (
        dispatch(login())
      ),
      getGtfsFiles: (agencyId) => (
        dispatch(loadGtfsFiles(agencyId))
      ),
      dispatch: dispatch,
    }
  );

  export default connect(
    mapStateToGtfsContainerPageProps,
    mapDispatchToGtfsContainerPageProps
  )(GtfsContainerPage);
  //export default ActiveRoutes;