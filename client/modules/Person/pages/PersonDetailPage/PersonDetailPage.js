import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PersonListItem/PersonListItem.css';

// Import Actions
import { fetchPerson } from '../../PersonActions';

// Import Selectors
import { getPerson } from '../../PersonReducer';

export function PersonDetailPage(props) {
  return (
    <div>
      <Helmet title={props.person.name} />
      <div className={`${styles['single-person']} ${styles['person-detail']}`}>
        <h3 className={styles['person-name']}>{props.person.name}</h3>
        <p className={styles['person.email']}><FormattedMessage id="by" /> {props.person.email}</p>
        <p className={styles['person-desc']}>{props.person.role}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
PersonDetailPage.need = [params => {
  return fetchPerson(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    person: getPerson(state, props.params.cuid),
  };
}

PersonDetailPage.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(PersonDetailPage);
