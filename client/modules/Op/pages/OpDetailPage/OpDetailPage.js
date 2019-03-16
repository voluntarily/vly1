import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/OpListItem/OpListItem.css';

// Import Actions
import { fetchOp } from '../../OpActions';

// Import Selectors
import { getOp } from '../../OpReducer';

export function OpDetailPage(props) {
  return (
    <div>
      <Helmet title={props.op.name} />
      <div className={`${styles['single-op']} ${styles['op-detail']}`}>
        <h3 className={styles['op-name']}>{props.op.name}</h3>
        <p className={styles['op.about']}><FormattedMessage id="by" /> {props.op.about}</p>
        <p className={styles['op-desc']}>{props.op.type}</p>
      </div>
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
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(OpDetailPage);
