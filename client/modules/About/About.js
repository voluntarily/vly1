/* eslint-disable no-trailing-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Markdown from 'markdown-to-jsx';
import { Button } from 'antd';

import aboutEn from './about-en.md';
import aboutMi from './about-mi.md';

const About = (props) => {
  const about = {
    mi: aboutMi,
    en: aboutEn,
  }[props.intl.locale];
 
  return (
    <Markdown
      children={about}
      options={{
        overrides: {
          Button: { component: Button },
        },
      }}
    />
  );
};

About.propTypes = {
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(About);
