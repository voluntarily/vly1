import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import OrgList from '../../components/OrgList';
import OrgCreateWidget from '../../components/OrgCreateWidget/OrgCreateWidget';

// Import Actions
import { addOrgRequest, fetchOrgs, deleteOrgRequest } from '../../OrgActions';
import { toggleAddOrg } from '../../../App/AppActions';

// Import Selectors
import { getShowAddOrg } from '../../../App/AppReducer';
import { getOrgs } from '../../OrgReducer';

class OrgListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchOrgs());
  }

  handleDeleteOrg = org => {
    if (confirm('Do you want to delete this organisation')) { // eslint-disable-line
      this.props.dispatch(deleteOrgRequest(org));
    }
  };

  handleAddOrg = (name, about, type) => {
    this.props.dispatch(toggleAddOrg());
    this.props.dispatch(addOrgRequest({ name, about, type }));
  };

  render() {
    return (
      <div>
        <OrgCreateWidget addOrg={this.handleAddOrg} showAddOrg={this.props.showAddOrg} />
        <OrgList handleDeleteOrg={this.handleDeleteOrg} orgs={this.props.orgs} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
OrgListPage.need = [() => { return fetchOrgs(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddOrg: getShowAddOrg(state),
    orgs: getOrgs(state),
  };
}

OrgListPage.propTypes = {
  orgs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  showAddOrg: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

OrgListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(OrgListPage);
