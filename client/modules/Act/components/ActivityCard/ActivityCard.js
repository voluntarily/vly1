/*
  Display an activity record in card format with a picture, title, and commitment.
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card } from 'antd';

// todo if image is not present then use a fallback.
const ActivityCard = ({ act, onPress, ...props }) => (
  <Link to={`/acts/${act.cuid}`} >
    <Card
      cover={<img src={act.imgUrl} alt={act.title} />}
      onClick={onPress}
      {...props}
    >
      <Card.Meta
        title={(
          <h1>{act.title}
            <small>{act.subtitle}</small>
          </h1>
        )}
        description={<p>{act.duration} commitment</p>}
      />
    </Card>
  </Link>
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

