/*
  Page to create or update an opportunity
  if cuid = 0 then create a new op
  else get the op by cuid and edit it
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import OpDetailForm from '../../components/OpDetailForm/OpDetailForm';
import { fetchOp, addOpRequest } from '../../OpActions';
import { getOp } from '../../OpReducer';
import { message } from 'antd';


export class OpUpdatePage extends Component {

  componentDidMount() {
    // cuid undefined or 0 means create new form otherwise edit the one given.
    if (this.props.params.cuid !== 0) {
      this.props.fetchOp(this.props.params.cuid);
    }
  }

  handleAddOp = (op) => {
    this.props.addOpRequest(op);
    message.success('Record saved.');
    // return to a previous page - but where did we originate?
    // PROBLEM - history is not in the props.
    this.props.history.push(`/ops/${op.cuid}`);
  };

  render() {
    return (
      <div>
        <h1>New or Edit Opportunity</h1>
        <OpDetailForm op={this.props.op} onSubmit={this.handleAddOp} />
        <pre>
          {JSON.stringify(this.props.op, null, 2)}
        </pre>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
OpUpdatePage.need = [params => {
  return fetchOp(params.cuid);
}];


OpUpdatePage.propTypes = {
  op: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    imgUrl: PropTypes.any,
    duration: PropTypes.string,
    location: PropTypes.string,
  }),
  params: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
  }),
  fetchOp: PropTypes.func.isRequired,
  addOpRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return ((props.params.cuid && props.params.cuid !== 0) ? {
    op: getOp(state, props.params.cuid),
  } : {
    op: {
      // title: '',
      // subtitle: '',
      // imgUrl: '',
      // duration: '',
      // location: '',
    },
  });
}

// export default connect(mapStateToProps)();

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchOp, addOpRequest })
)(OpUpdatePage);
