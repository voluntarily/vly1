import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import OpListItem from './OpListItem/OpListItem';

function OpList(props) {
  return (
    <div className="listView">
      {
        props.ops.map(op => (
          <OpListItem
            op={op}
            key={op.cuid}
            onDelete={() => props.handleDeleteOp(op.cuid)}
          />
        ))
      }
    </div>
  );
}

OpList.propTypes = {
  ops: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteOp: PropTypes.func.isRequired,
};

export default OpList;
