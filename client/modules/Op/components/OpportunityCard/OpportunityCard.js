/*
  Display an activity record in card format with a picture, title, and commitment.
*/
import React from 'react';
import PropTypes from 'prop-types';
import styles from './OpportunityCard.css';
import { Link } from 'react-router';

// todo if image is not present then use a fallback.
const OpportunityCard = ({ op, onPress, ...props }) => (
  <div className={styles.card} onClick={onPress} {...props}>
    <Link to={`/ops/${op.cuid}`} >
      <img className={styles.media} onClick={onPress} src={op.imgUrl} alt={op.title}></img>
      <h1>{op.title}
        <small>{op.subtitle}</small>
      </h1>
      <p>{op.duration} commitment</p>
    </Link>
  </div>
);

OpportunityCard.propTypes = {
  op: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    imgUrl: PropTypes.any,
    duration: PropTypes.string,
    cuid: PropTypes.string.isRequired,
  }),
  onPress: PropTypes.func,
};


export default OpportunityCard;

