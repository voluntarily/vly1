import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import * as Button from '../../../../components/Button/Button';

// Import Style
import styles from './ActListItem.css';

function ActListItem(props) {
  return (
    <div className={styles['single-act']}>
      <h1>
        <Link to={`/acts/${props.act.cuid}`} >
          {props.act.title}
        </Link>
        <small>{props.act.subtitle}</small>
      </h1>
      <p className={styles['act-description']}><FormattedMessage id="actAbout" /> {props.act.description}</p>
      <p className={styles['act-type']}>{props.act.type}</p>
      <Button.Tertiary className="actDelete" onClick={props.onDelete}><FormattedMessage id="deleteAct" /></Button.Tertiary>
      <hr className={styles.divider} />
    </div>
  );
}

ActListItem.propTypes = {
  act: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActListItem;
