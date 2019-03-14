/*
  Display an activity record in card format with a picture, title, and commitment.
*/
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ActivityCard.css';

// todo if image is not present then use a fallback.
const ActivityCard = ({ activity, onPress, ...props }) => (
  <div className={styles.card} onClick={onPress} {...props}>
    <img className={styles.media} onClick={onPress} src={activity.image} alt={activity.title}></img>
    <h1>{activity.title}</h1>
    <p>{activity.commitment} commitment</p>
  </div>
);

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.any,
    commitment: PropTypes.string,
  }),
  onPress: PropTypes.func,
};


export default ActivityCard;

