import React from 'react';
import PropTypes from 'prop-types';
import OpportunityCard from './OpportunityCard/OpportunityCard';

function OpList(props) {
  return (
    <div>
      {
        props.ops.map(op => (
          <OpportunityCard
            op={op}
            key={op.cuid}
          />
        ))
      }
    </div>
  );
}


OpList.propTypes = {
  ops: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    imgUrl: PropTypes.any,
    duration: PropTypes.string,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteOp: PropTypes.func.isRequired,
};

export default OpList;
