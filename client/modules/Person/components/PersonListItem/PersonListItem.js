import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PersonListItem.css';

function PersonListItem(props) {
  return (
    <div className={styles['single-person']}>
      <h3>
        <Link to={`/people/${props.person.cuid}`} >
          {props.person.name}
        </Link>
      </h3>
      <p className={styles['person-email']}><FormattedMessage id="personEmail" /> {props.person.email}</p>
      <p className={styles['person-role']}>{props.person.role}</p>
    </div>
  );
}

PersonListItem.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  // npm onDelete: PropTypes.func.isRequired,
};

export default PersonListItem;
