import React from 'react';
import './Header.css';
import * as actions from '../../actions/actions';
import { getUserAgencies} from '../../selectors'
import {connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react'

class SelectAgency extends React.Component {
  onSelectAgency = (evt, data) => {
      const agencyId = data.value;
      this.props.selectAgency(agencyId);
    };
  
  render(){
      const options=this.props.agencies.map((agency) => (
        {key: agency.id, value: agency.id, text: agency.name}
      ))

      return (
        <Dropdown className="font-size12" placeholder='Select agency' selection options={options} 
          value={this.props.agencyId} onChange={this.onSelectAgency} />
      );
  }
}

const mapStateToSelectAgencyProps = (state) => (
    {
      agencyId: state.agencyId,
      agencies: getUserAgencies(state)
    }
  );
  
  const mapDispatchToSelectAgencyProps = (dispatch) => (
    {
      selectAgency: (agencyId) => (
        dispatch(actions.selectAgency(agencyId))
      ),
      dispatch: dispatch,
    }
  );

  export default connect(
    mapStateToSelectAgencyProps,
    mapDispatchToSelectAgencyProps
  )(SelectAgency);
