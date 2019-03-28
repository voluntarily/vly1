/*
  Display an activity record in card format with a picture, title, and commitment.
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card } from 'antd';

// todo if image is not present then use a fallback.
const OpportunityCard = ({ op, onPress, ...props }) => (
  <Link to={`/ops/${op.cuid}`} >
    <Card
      cover={<img src={op.imgUrl} alt={op.title} />}
      onClick={onPress}
      {...props}
    >
      <Card.Meta
        title={(
          <h1>{op.title}
            <small>{op.subtitle}</small>
          </h1>
        )}
        description={<p>{op.duration} commitment</p>}
      />
    </Card>
  </Link>
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

