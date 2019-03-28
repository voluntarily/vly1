import PropTypes from 'prop-types';
import React from 'react';
import ActivityCard from './ActivityCard/ActivityCard';

function ActList(props) {
  return (
    <div>
      {
        props.acts.map(act => (
          <ActivityCard
            act={act}
            key={act.cuid}
          />
        ))
      }
    </div>
  );
}

ActList.propTypes = {
  acts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    imgUrl: PropTypes.any,
    description: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteAct: PropTypes.func.isRequired,
};

export default ActList;
