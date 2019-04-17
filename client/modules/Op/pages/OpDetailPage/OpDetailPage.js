import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Popconfirm, message } from 'antd';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
// import OpDetailForm from '../../components/OpDetailForm/OpDetailForm';
import OpDetail from '../../components/OpDetail/OpDetail';
import { fetchOp, deleteOpRequest } from '../../OpActions';
import { getOp } from '../../OpReducer';
import OpDetailForm from '../../components/OpDetailForm/OpDetailForm';

export class OpDetailPage extends Component {

  componentDidMount() {
    // TODO this cuid may not need fetching if its in the store already
    // but on page reload it does.
    if (!this.props.op) {
      this.props.fetchOp(this.props.params.cuid);
    }
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
          <small>Action buttons here depend on user role</small>
          {/* <Link to={`/ops/${this.props.op.cuid}/edit`} > */}
          <Button type="primary" shape="round" >
            <FormattedMessage id="claimOp" defaultMessage="I'm Interested" description="Button to show interest in an opportunity on OpDetails page" />
          </Button>
          {/* </Link> */}
          <Link to={`/ops/${this.props.op.cuid}/edit`} >
            <Button type="secondary" shape="round" >
              <FormattedMessage id="editOp" defaultMessage="Edit" description="Button to edit an opportunity on OpDetails page" />
            </Button>
          </Link>
          <Popconfirm title="Confirm removal of this opportunity." onConfirm={this.handleDeleteOp} onCancel={this.cancel} okText="Yes" cancelText="No">
            <Button type="danger" shape="round" >
              <FormattedMessage id="deleteOp" defaultMessage="Remove Request" description="Button to remove an opportunity on OpDetails page" />
            </Button>
          </Popconfirm>
        </div>);
    } else {
      content =
        (<div>
          <h2>Sorry this opportunity is no longer available</h2>
          <Link to={'/ops'} >Search for some more</Link>
          <p>or </p>
          <Link to={'/ops/0/edit'} >create a new opportunity</Link>
          <OpDetailForm />
        </div>);
    }
    return (content);
  }
}

// Actions required to provide data for this component to render in server side.
OpDetailPage.need = [params => {
  // TODO cuid should be valid or we will get a problem with an empty op.
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
