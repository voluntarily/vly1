import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OpDetail from '../../components/OpDetail/OpDetail';
import { Button, Popconfirm, message } from 'antd';


import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Actions & Selectors
import { fetchOp, deleteOpRequest } from '../../OpActions';
import { getOp } from '../../OpReducer';

export class OpDetailPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchOp(this.props.params.cuid));
  }

  handleDeleteOp = () => {
    const op = this.props.op;
    this.props.dispatch(deleteOpRequest(op.cuid));
      // return to a previous page - but where did we originate?
      // this.props.history.push('/');

      // TODO crashing at
      // opportunity.controller.js:77:17
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
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    imgUrl: PropTypes.any,
    description: PropTypes.string,
    duration: PropTypes.string,
    status: PropTypes.string,
    cuid: PropTypes.string.isRequired,
  }),
  params: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
  }),
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(OpDetailPage);
