/* Dumb React component Shows contents of an opportunity
 */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Markdown from 'markdown-to-jsx';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'antd';

export function OpDetail({ op }) {
  return (
    <div>
      <Helmet title={op.title} />
      <Row type="flex" align="top">
        <Col // these settings put the image first on narrow pages.
          sm={{ span: 24, order: 1 }}
          md={{ span: 12, order: 2 }}
        >
          <img style={{ width: '100%' }} src={op.imgUrl} alt={op.title} />
        </Col>
        <Col
          sm={{ span: 24, order: 2 }}
          md={{ span: 12, order: 1 }}
        >
          <h1>{op.title}</h1>
          <p>{op.subtitle}</p>
          <dl>
            <dt>
              <FormattedMessage
                id="commitment"
                defaultMessage="commitment"
                description="label in opportunity e.g 2 hours commitment"
              />
            </dt><dd>{op.duration}</dd>
            <dt>location</dt><dd>{op.location}</dd>
            <dt>status</dt><dd>{op.status}</dd>
          </dl>
          <Markdown
            children={op.description}
            options={{
              overrides: {
                Button: { component: Button },
              },
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

OpDetail.propTypes = {
  op: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    imgUrl: PropTypes.any,
    description: PropTypes.string,
    duration: PropTypes.string,
    status: PropTypes.string,
    cuid: PropTypes.string.isRequired,
  }),
};

export default OpDetail;
