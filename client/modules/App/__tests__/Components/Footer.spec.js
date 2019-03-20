import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Footer } from '../../components/Footer/Footer';
import { intl } from '../../../../util/react-intl-test-helper';

const intlProp = { ...intl, enabledLanguages: ['en', 'fr'] };

test('renders the footer properly', t => {
  const router = {
    isActive: sinon.stub().returns(true),
  };

  const wrapper = shallow(
    <Footer switchLanguage={() => {}} intl={intlProp} />,
    {
      context: {
        router,
        intl,
      },
    }
  );

  t.is(wrapper.find('span').length, 1);
  t.is(wrapper.find('span').first().text(), '© 2019 · Voluntari.ly');
});

// TODO test the language switcher
