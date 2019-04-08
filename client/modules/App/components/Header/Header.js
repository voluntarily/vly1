import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Layout } from 'antd';

// Import Style
import styles from './Header.css';
import Vlogo from './Vlogo';
import Navigation from './Navigation';
import navItems from './navigation.json';

// eslint-disable-next-line no-unused-vars
export function Header(props) {
  return (
    <Layout.Header className={styles.header}>
      <Vlogo fill="#fff" />
      <h1 className={styles['site-title']}>
        <Link to="/" >
          <FormattedMessage
            id="siteTitle"
            defaultMessage="Voluntari.ly"
            description="Name of the Application on the menu bar"
          />
        </Link>
      </h1>
      {/* <SearchBar /> */}
      <Navigation items={navItems.public} />
    </Layout.Header>
  );
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  intl: PropTypes.object,
};

export default Header;
