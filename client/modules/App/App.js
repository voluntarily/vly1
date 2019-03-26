import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';

// Import Style
import 'antd/dist/antd.css';
import styles from '../../main.css';

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Actions
import { toggleAddPost, toggleAddOrg } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('./components/DevTools').default;
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };
  toggleAddOrgSection = () => {
    this.props.dispatch(toggleAddOrg());
  };
  render() {
    return (
      <Layout>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <Helmet
          title="Voluntari.ly"
          titleTemplate="%s - App"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
        />
        <Header intl={this.props.intl} />
        <Layout.Content style={{ paddingTop: '4.8em' }}>
          <div className={styles.container}>
            {this.props.children}
          </div>
        </Layout.Content>
        <Footer
          switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
          intl={this.props.intl}
        />
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
