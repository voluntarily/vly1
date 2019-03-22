import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';
import Vlogo from './Vlogo';

// eslint-disable-next-line no-unused-vars
export function Header(props) {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <Vlogo />
        <h1 className={styles['site-title']}>
          <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
        </h1>
      </div>
      {/* <SearchBar /> */}
      {/* <MainMenu /> */}
    </div>
  );
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  intl: PropTypes.object,
};

export default Header;
