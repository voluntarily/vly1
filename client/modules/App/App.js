import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import { Layout } from 'antd';
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
    this.props.toggleAddPost();
  };
  toggleAddOrgSection = () => {
    this.props.toggleAddOrg();
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
        <Layout.Content style={{ padding: '5.8em 4em 2em' }}>
          {this.props.children}
        </Layout.Content>
        <Footer
          switchLanguage={lang => this.props.switchLanguage(lang)}
          intl={this.props.intl}
        />
      </Layout>
    );
  }
}

App.defaultProps = {
  toggleAddOrg: () => {},
  toggleAddPost: () => {},
  switchLanguage: () => {},
};

App.propTypes = {
  children: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  toggleAddOrg: PropTypes.func,
  toggleAddPost: PropTypes.func,
  switchLanguage: PropTypes.func,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

function mapDispatchToProps() {
  return {
    toggleAddPost,
    toggleAddOrg,
    switchLanguage,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
