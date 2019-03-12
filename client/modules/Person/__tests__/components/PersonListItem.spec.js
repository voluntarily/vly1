import React from 'react';
import test from 'ava';
import PersonListItem from '../../components/PersonListItem/PersonListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const testy = {
  cuid: 'abc',
  name: 'Tester McTestFace',
  email: 'testy@McTestFace.com',
  role: 'tester',
};


const props = {
  person: testy,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <PersonListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-person'));
  t.is(wrapper.find('Link').first().prop('children'), testy.name);
  t.regex(wrapper.find('.person-email').first().text(), new RegExp(testy.email));
  t.is(wrapper.find('.person-role').first().text(), testy.role);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <PersonListItem {...props} />
  );

  t.deepEqual(wrapper.prop('person'), props.person);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});
