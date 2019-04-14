import React from 'react';
import PropTypes from 'prop-types';
import OpportunityCard from './OpportunityCard/OpportunityCard';
import { Row, Col } from 'antd';

function OpList(props) {
  return (
    <Row type="flex" align="top" gutter={{ xs: 8, sm: 16, md: 24 }} >
      {
        props.ops.map(op => (
          <Col xs={24} sm={12} md={8} lg={6} xxl={4} key={op.cuid} >
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
};

export default OpList;
