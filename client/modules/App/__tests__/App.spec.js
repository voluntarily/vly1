import React from 'react';
import PropTypes from 'prop-types';
import test from 'ava';
import sinon from 'sinon';
import { mount, render } from 'enzyme';
import { intlShape, IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import { App } from '../App';
import { intl } from '../../../util/react-intl-test-helper';

const intlProp = { ...intl, enabledLanguages: ['en', 'mi'] };
const children = <h1>Test</h1>;
const dispatch = sinon.spy();
const mockStore = configureStore()({
  app: {
    showAddPost: false,
    showAddOrg: false,
    showAddPerson: false,
    showLoginForm: false,
  },
});
const props = {
  children,
  dispatch,
  location: {
    pathname: '/',
  },
  intl: intlProp,
};

test('renders properly', t => {
  const wrapper = render(
    <IntlProvider><App {...props} /></IntlProvider>,
    {
      context: {
        store: mockStore,
      },
      childContextTypes: {
        store: mockStore,
      },
    },
  );

  // t.is(wrapper.find('Helmet').length, 1);
  t.is(wrapper.find('Header').length, 1);
  t.is(wrapper.find('Footer').length, 1);
});

test('calls componentDidMount', t => {
  sinon.spy(App.prototype, 'componentDidMount');
  mount(
    <App {...props} />,
    {
      context: {
        router: {
          isActive: sinon.stub().returns(true),
          push: sinon.stub(),
          replace: sinon.stub(),
          go: sinon.stub(),
          goBack: sinon.stub(),
          goForward: sinon.stub(),
          setRouteLeaveHook: sinon.stub(),
          createHref: sinon.stub(),
        },
        intl,
        store: mockStore,
      },
      childContextTypes: {
        router: PropTypes.object,
        intl: intlShape,
        store: mockStore,
      },
    },
  );

  t.truthy(App.prototype.componentDidMount.calledOnce);
  App.prototype.componentDidMount.restore();
});

