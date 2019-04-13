import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OpDetail from '../../components/OpDetail/OpDetail';
import { Button, Popconfirm, message } from 'antd';
import { OpDetailForm } from '../../components/OpDetailForm/OpDetailForm';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Actions & Selectors
import { fetchOp, deleteOpRequest } from '../../OpActions';
import { getOp } from '../../OpReducer';

export class OpDetailPage extends Component {

  componentDidMount() {
    this.props.fetchOp(this.props.params.cuid);
  }

  handleDeleteOp = () => {
    const op = this.props.op;
    this.props.deleteOpRequest(op.cuid);
    // after this the page content is invalid. so we need to move on.
      // this.props.history.push('/');
  };

  cancel = () => {
    message.error('Delete Cancelled');
  }

  render() {
    let content;
    if (this.props.op) {
      content =
        (<div>
          <OpDetail op={this.props.op} />
          <h2>Action buttons here depend on user role</h2>
          <Link to={`/ops/${this.props.op.cuid}/edit`} >
            <Button type="primary" shape="round" >
              <FormattedMessage id="editOp" defaultMessage="Edit" description="Button to edit an opportunity on OpDetails page" />
            </Button>
          </Link>
          <Popconfirm title="Confirm removal of this opportunity." onConfirm={this.handleDeleteOp} onCancel={this.cancel} okText="Yes" cancelText="No">
            <Button type="danger" >
              <FormattedMessage id="deleteOp" defaultMessage="Remove Request" description="Button to remove an opportunity on OpDetails page" />
            </Button>
          </Popconfirm>
        </div>);
    } else {
      content =
        (<div>
          <h2>Sorry this opportunity is no longer available</h2>
          <Link to={'/ops'} >Search for some more</Link>
          <p>or create a new opportunity</p>
          <OpDetailForm />
        </div>);
    }
    return (content);
  }
}

// Actions required to provide data for this component to render in server side.
OpDetailPage.need = [params => {
  return fetchOp(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    op: getOp(state, props.params.cuid),
  };
}

OpDetailPage.propTypes = {
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
  deleteOpRequest: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { fetchOp, deleteOpRequest }
  )(OpDetailPage);
