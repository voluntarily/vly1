import React from 'react';
import PropTypes from 'prop-types';
import OpportunityCard from './OpportunityCard/OpportunityCard';
import { Row, Col } from 'antd';

function OpList(props) {
  return (
    <Row gutter={32}>
      {
        props.ops.map(op => (
          <Col span={8}>
            <OpportunityCard
              op={op}
              key={op.cuid}
            />
          </Col>
        ))
      }
    </Row>
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
