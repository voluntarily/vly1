import React from 'react';
import PropTypes from 'prop-types';
import test from 'ava';
import sinon from 'sinon';
import { mount, render } from 'enzyme';
import { intlShape, IntlProvider } from 'react-intl';
import { App } from '../App';
import { intl } from '../../../util/react-intl-test-helper';

const intlProp = { ...intl, enabledLanguages: ['en', 'mi'] };
const children = <h1>Test</h1>;
const dispatch = sinon.spy();
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
    <IntlProvider><App {...props} /></IntlProvider>
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
      },
      childContextTypes: {
        router: PropTypes.object,
        intl: intlShape,
      },
    },
  );

  t.truthy(App.prototype.componentDidMount.calledOnce);
  App.prototype.componentDidMount.restore();
});

