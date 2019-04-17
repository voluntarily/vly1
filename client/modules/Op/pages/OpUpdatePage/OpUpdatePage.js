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
    if (this.props.params.cuid !== '0') {
      if (!this.props.op) {
        this.props.fetchOp(this.props.params.cuid);
      }
    }
  }

  handleAddOp = (op) => {
    this.props.addOpRequest(op)
    .then((res) => {
      const cuid = (this.props.params.cuid !== '0') ?
      this.props.params.cuid : res.cuid;
      message.success('Record saved. ', cuid);
      this.props.router.push(`/ops/${cuid}`);
    });
  };

  handleCancel = () => {
    this.props.router.goBack();
  }
  render() {
    return (
      <div>
        <h1>Create a request</h1>
        <small>Ready to get some help? Lets start by letting volunteers know what you need</small>
        <OpDetailForm op={this.props.op} onSubmit={this.handleAddOp} onCancel={this.handleCancel} />
        <br />
        {/* <Collapse>
          <Panel header="Debug" key="1">
            <pre>
              {JSON.stringify(this.props.op, null, 2)}
            </pre>
          </Panel>
        </Collapse> */}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
OpUpdatePage.need = [params => {
  return (params.cuid && params.cuid !== '0')
    ? fetchOp(params.cuid)
    : null;
}];


OpUpdatePage.propTypes = {
  op: PropTypes.shape({
    cuid: PropTypes.string,
    title: PropTypes.string,
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
  router: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return ((props.params.cuid && props.params.cuid !== '0') ? {
    op: getOp(state, props.params.cuid),
  } : {
    // for new ops load the default template doc.
    op: {
      title: 'template title',
      subtitle: 'subtitle',
      imgUrl: '',
      duration: '',
      location: '',
      description: '',
      status: 'draft',
    },
  });
}

// export default connect(mapStateToProps)();

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchOp, addOpRequest })
)(OpUpdatePage);
