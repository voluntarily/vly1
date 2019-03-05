import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './OrgListItem.css';

function OrgListItem(props) {
  return (
    <div className={styles['single-org']}>
      <h3 className={styles['org-name']}>
        <Link to={`/orgs/${props.org.slug}-${props.org.cuid}`} >
          {props.org.name}
        </Link>
      </h3>
      <p className={styles['org-about']}><FormattedMessage id="by" /> {props.org.about}</p>
      <p className={styles['org-desc']}>{props.org.type}</p>
      <p className={styles['org-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteOrg" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

OrgListItem.propTypes = {
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OrgListItem;
