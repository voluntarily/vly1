/* Dumb React component Shows contents of an opportunity
 */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Markdown from 'markdown-to-jsx';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';

// Import Style
// import styles from '../../components/OpListItem/OpListItem.css';


export function OpDetail({ op }) {
  return (
    <section>
      <Helmet title={op.title} />
      <h1>{op.title}</h1>
      <p>{op.subtitle}</p>
      <img src={op.imgUrl} alt={op.title} />
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
    </section>
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
