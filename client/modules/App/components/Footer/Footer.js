import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styles from './Footer.css';

export function Footer(props) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );
  return (
    <div className={styles.footer}>
      <span>&copy; 2019 &middot; <a href="http://voluntari.ly">Voluntari.ly</a></span>
      <ul className={styles.menu}>
        <li><FormattedMessage id="switchLanguage" /></li>
        {languageNodes}
      </ul>
    </div>
  );
}

Footer.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};


export default Footer;
