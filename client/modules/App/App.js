import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import { Layout } from 'antd';
import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';

// Import Actions
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
        <Layout.Content >
          {this.props.children}
        </Layout.Content>
        <Footer
          switchLanguage={lang => this.props.switchLanguage(lang)}
          intl={this.props.intl}
        />
        <Login visible />
      </Layout>
    );
  }
}

App.defaultProps = {
  // eslint-disable-next-line no-console
  switchLanguage: () => {},
};

App.propTypes = {
  children: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  switchLanguage: PropTypes.func,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps, { switchLanguage })(App);
