import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OpDetail from '../../components/OpDetail/OpDetail';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';

// Import Actions & Selectors
import { fetchOp, deleteOpRequest } from '../../OpActions';
import { getOp } from '../../OpReducer';

export class OpDetailPage extends Component {
  handleDeleteOp = op => {
    if (confirm('Do you want to delete this request')) { // eslint-disable-line
      deleteOpRequest(op.cuid);
      // return to a previous page - but where did we originate?
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <article>
        <OpDetail op={this.props.op} />
        <h2>Action buttons here depend on user role</h2>
        <Button type="danger" onClick={this.handleDeleteOp} >
          <FormattedMessage id="deleteOp" defaultMessage="Remove Request" description="Button to remove an opportunity on OpDetails page" />
        </Button>
      </article>
    );
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
};

export default connect(mapStateToProps)(OpDetailPage);
