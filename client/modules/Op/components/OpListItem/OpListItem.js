import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import * as Button from '../../../../components/Button/Button';

// Import Style
import styles from './OpListItem.css';

function OpListItem(props) {
  return (
    <div className={styles['single-op']}>
      <h3>
        <Link to={`/ops/${props.op.cuid}`} >
          {props.op.name}
        </Link>
      </h3>
      <p className={styles['op-about']}><FormattedMessage id="opAbout" /> {props.op.about}</p>
      <p className={styles['op-type']}>{props.op.type}</p>
      <Button.Tertiary className="opDelete" onClick={props.onDelete}><FormattedMessage id="deleteOp" /></Button.Tertiary>
      <hr className={styles.divider} />
    </div>
  );
}

OpListItem.propTypes = {
  op: PropTypes.shape({
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OpListItem;
