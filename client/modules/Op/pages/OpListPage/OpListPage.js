import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Import Selectors
import OpCreateWidget from '../../components/OpCreateWidget/OpCreateWidget';
// Import Components
import OpList from '../../components/OpList';
// Import Actions
import { addOpRequest, deleteOpRequest, fetchOps } from '../../OpActions';
import { getOps } from '../../OpReducer';
import * as Button from '../../../../components/Button/Button';

class OpListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { showCreateOpWidget: false };
  }

  componentDidMount() {
    this.props.dispatch(fetchOps());
  }
  handleOpCreate = () => {
    this.setState({ showCreateOpWidget: true });
  };
  handleCancelOp = () => {
    this.setState({ showCreateOpWidget: false });
  };

  handleDeleteOp = op => {
    if (confirm('Do you want to delete this opportunities')) { // eslint-disable-line
      this.props.dispatch(deleteOpRequest(op));
    }
  };

  handleAddOp = (name, about, type) => {
    this.setState({ showCreateOpWidget: false });
    this.props.dispatch(addOpRequest({ name, about, type }));
  };

  render() {
    return (
      <div>
        <h1><FormattedMessage id="opportunities" /></h1>
        <div>
          {
            this.state.showCreateOpWidget
            ? <OpCreateWidget addOp={this.handleAddOp} cancelOp={this.handleCancelOp} />
            : <Button.Primary onClick={this.handleOpCreate} ><FormattedMessage id="addOp" /></Button.Primary>
          }
        </div>
        <OpList
          handleDeleteOp={this.handleDeleteOp}
          ops={this.props.ops}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
OpListPage.need = [() => { return fetchOps(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
//    showAddOp: getShowAddOp(state),
    ops: getOps(state),
  };
}

OpListPage.propTypes = {
  ops: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
//  showAddOp: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

OpListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(OpListPage);
