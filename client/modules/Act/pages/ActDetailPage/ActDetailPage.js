import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';

// Import Style
// import styles from '../../components/ActListItem/ActListItem.css';

// Import Actions
import { fetchAct } from '../../ActActions';

// Import Selectors
import { getAct } from '../../ActReducer';

export function ActDetailPage({ act }) {
  return (
    <div>
      <Helmet title={act.title} />
      <div>
        <h1>{act.title}
          <small>{act.subtitle}</small>
        </h1>
        <dl>
          <dt>description</dt><dd>{act.description}</dd>
          <dt>cuid</dt><dd>{act.cuid}</dd>
          <dt>createdDateTimeUTC</dt><dd>{act.createdDateTimeUTC}</dd>
          <dt>lastModifiedDateTimeUTC</dt><dd>{act.lastModifiedDateTimeUTC}</dd>
          <dt>imgUrl</dt><dd>{act.imgUrl}</dd>
          <dt>description</dt><dd>{act.description}</dd>
          <dt>duration</dt><dd>{act.duration}</dd>
          <dt>location</dt><dd>{act.location}</dd>
          <dt>status</dt><dd>{act.status}</dd>
        </dl>
    {/* contentUrls: ['https://youtube.com/123', 'https://coolwebsite'], */}
    {/* categoryTags: {
      resourceType: 'projectOriented',
      topics: ['garden', 'robots'],
    }, */}
    {/* qualityRatingPoints: 150,
    topicRatingPoints: 45, */}

      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
ActDetailPage.need = [params => {
  return fetchAct(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    act: getAct(state, props.params.cuid),
  };
}

ActDetailPage.propTypes = {
  act: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(ActDetailPage);
