import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';

// Import Style
// import styles from '../../components/OpListItem/OpListItem.css';

// Import Actions
import { fetchOp } from '../../OpActions';

// Import Selectors
import { getOp } from '../../OpReducer';

export function OpDetailPage({ op }) {
  return (
    <div>
      <Helmet title={op.title} />
      <h1>{op.title}
        <small>{op.subtitle}</small>
      </h1>
      <dl>
        <dt>imgUrl</dt><dd>{op.imgUrl}</dd>
        <dt>description</dt><dd>{op.description}</dd>
        <dt>duration</dt><dd>{op.duration}</dd>
        <dt>location</dt><dd>{op.location}</dd>
        <dt>status</dt><dd>{op.status}</dd>
        <dt>cuid</dt><dd>{op.cuid}</dd>
      </dl>
    </div>
  );
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
