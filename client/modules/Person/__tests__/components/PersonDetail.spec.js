import React from 'react';
import test from 'ava';
import PersonDetail from '../../components/PersonDetail/PersonDetail';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';


const testy = {
  cuid: '1234567890',
  name: 'Tester McTestFace',
  moniker: 'Testy',
  phone: '0800 555 TEST',
  gender: 'indeterminate',
  email: 'testy@McTestFace.com',
  about: 'Ich bin ein tester',
  role: ['tester'],
};

const props1 = {
  person: testy,
};

const testyMin = {
  cuid: '1234567892',
  name: 'Tester McTestFace',
  email: 'testy@McTestFace.com',
  moniker: 'Testy',
  role: ['tester'],
};
const props2 = {
  person: testyMin,
};

test('renders full record properly', t => {
  const wrapper = shallowWithIntl(
    <PersonDetail {...props1} />
  );

  t.is(wrapper.find('h1').first().prop('children'), testy.moniker);
  t.regex(wrapper.find('dl > dd').at(1).text(), new RegExp(testy.email));
  t.is(wrapper.find('li').first().text(), testy.role[0]);
});

test('renders minimal record properly', t => {
  const wrapper = shallowWithIntl(
    <PersonDetail {...props2} />
  );

  t.is(wrapper.find('h1').first().prop('children'), testy.moniker);
  t.regex(wrapper.find('dl > dd').at(1).text(), new RegExp(testy.email));
  t.is(wrapper.find('li').first().text(), testy.role[0]);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <PersonDetail {...props1} />
  );

  t.deepEqual(wrapper.prop('person'), testy);
});
