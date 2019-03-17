/*
  Display an activity record in card format with a picture, title, and commitment.
*/
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ActivityCard.css';
import { Link } from 'react-router';

// todo if image is not present then use a fallback.
const ActivityCard = ({ act, onPress, ...props }) => (
  <div className={styles.card} onClick={onPress} {...props}>
    <Link to={`/acts/${act.cuid}`} >
      <img className={styles.media} onClick={onPress} src={act.imgUrl} alt={act.title}></img>
      <h1>{act.title}
        <small>{act.subtitle}</small>
      </h1>
      <p>{act.duration} commitment</p>
    </Link>
  </div>
);

ActivityCard.propTypes = {
  act: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    imgUrl: PropTypes.any,
    duration: PropTypes.string,
    cuid: PropTypes.string.isRequired,
  }),
  onPress: PropTypes.func,
};


export default ActivityCard;

