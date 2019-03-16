import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/ActListItem/ActListItem.css';

// Import Actions
import { fetchAct } from '../../ActActions';

// Import Selectors
import { getAct } from '../../ActReducer';

export function ActDetailPage(props) {
  return (
    <div>
      <Helmet title={props.act.title} />
      <div className={`${styles['single-act']} ${styles['act-detail']}`}>
        <h3 className={styles['act-title']}>{props.act.title}</h3>
        <p className={styles['act.description']}><FormattedMessage id="by" /> {props.act.description}</p>
        <p className={styles['act-desc']}>{props.act.type}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
ActDetailPage.need = [params => {
  return fetchAct(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    act: getAct(state, props.params.cuid),
  };
}

ActDetailPage.propTypes = {
  act: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(ActDetailPage);
