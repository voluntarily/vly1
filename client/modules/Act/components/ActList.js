import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import ActListItem from './ActListItem/ActListItem';

function ActList(props) {
  return (
    <div className="listView">
      {
        props.acts.map(act => (
          <ActListItem
            act={act}
            key={act.cuid}
            onDelete={() => props.handleDeleteAct(act.cuid)}
          />
        ))
      }
    </div>
  );
}

ActList.propTypes = {
  acts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteAct: PropTypes.func.isRequired,
};

export default ActList;
