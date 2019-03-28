import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Layout } from 'antd';
import styles from './Footer.css';

export function Footer(props) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );
  return (
    <Layout.Footer>
      <div className={styles.footer}>
        <span>&copy; 2019 &middot; <a href="http://voluntari.ly">Voluntari.ly</a></span>
        <ul className={styles.menu}>
          <li>
            <FormattedMessage
              id="switchLanguage"
              defaultMessage="Switch Language"
              description="Label for menu item to switch between Engish and other languages"
            />
          </li>
          {languageNodes}
        </ul>
      </div>
    </Layout.Footer>
  );
}

Footer.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};


export default Footer;
