import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import * as Button from '../../../../components/Button/Button';

// Import Style
import styles from './OrgListItem.css';

function OrgListItem(props) {
  return (
    <div className={styles['single-org']}>
      <h3>
        <Link to={`/orgs/${props.org.cuid}`} >
          {props.org.name}
        </Link>
      </h3>
      <p className={styles['org-about']}><FormattedMessage id="orgAbout" /> {props.org.about}</p>
      <p className={styles['org-type']}>{props.org.type}</p>
      <Button.Tertiary className="orgDelete" onClick={props.onDelete}><FormattedMessage id="deleteOrg" /></Button.Tertiary>
      <hr className={styles.divider} />
    </div>
  );
}

OrgListItem.propTypes = {
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OrgListItem;
