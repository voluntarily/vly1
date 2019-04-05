import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router';
import styles from './Footer.css';

export function Footer(props) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );
  const languageNodes2 = props.intl.enabledLanguages.map(
    lang => <Menu.Item key={lang} onClick={() => props.switchLanguage(lang)}>{lang}</Menu.Item>
  );
  return (
    <Layout.Footer>
      <nav>
        <Menu mode="horizontal" theme="dark" >
          <Menu.Item><Link to="/acts" >Activities</Link></Menu.Item>
          <Menu.Item><Link to="/ops" >Opportunities</Link></Menu.Item>
          <Menu.Item><Link to="/people" >People</Link></Menu.Item>
          <Menu.Item><Link to="/orgs" >Organisations</Link></Menu.Item>
          <Menu.Item><Link to="/showcase" >Showcase</Link></Menu.Item>
          {/*  TODO move language selector into Menu group
              Need to solve injecting translations into menus.
          <FormattedMessage
            id="switchLanguage"
            defaultMessage="Switch Language"
            description="Label for menu item to switch between Engish and other languages"
          >
            {
                title => (
                  <Menu.ItemGroup title={title}>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                )
            }
          </FormattedMessage> */}
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
        </Menu>
      </nav>
      <div className={styles.footer}>
        <span>&copy; 2019 &middot; <a href="http://voluntari.ly">Voluntari.ly</a></span>
        <p>Voluntari.ly is an initiative of the <a href="https://www.pamfergusson.org.nz/"> Pam Fergsusson Charitable Trust></a>
 Supported by: Datacom, Spark, ATEED
        </p>
      </div>
    </Layout.Footer>
  );
}

Footer.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};


export default Footer;
