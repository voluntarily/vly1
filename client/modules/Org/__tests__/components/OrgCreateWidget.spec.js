import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { OrgCreateWidget } from '../../components/OrgCreateWidget/OrgCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addOrg: () => {},
  showAddOrg: true,
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <OrgCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewOrg" />));
  t.is(wrapper.find('input').length, 2);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddOrg is false', t => {
  const wrapper = mountWithIntl(
    <OrgCreateWidget {...props} />
  );

  wrapper.setProps({ showAddOrg: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <OrgCreateWidget {...props} />
  );

  t.is(wrapper.prop('addOrg'), props.addOrg);
  t.is(wrapper.prop('showAddOrg'), props.showAddOrg);
});

test('calls addOrg', t => {
  const addOrg = sinon.spy();
  const wrapper = mountWithIntl(
    <OrgCreateWidget addOrg={addOrg} showAddOrg />
  );

  wrapper.ref('name').value = 'David';
  wrapper.ref('about').value = 'Some About';
  wrapper.ref('type').value = 'corporate';

  wrapper.find('a').first().simulate('click');
  t.truthy(addOrg.calledOnce);
  t.truthy(addOrg.calledWith('David', 'Some About', 'corporate'));
});

test('empty form doesn\'t call addOrg', t => {
  const addOrg = sinon.spy();
  const wrapper = mountWithIntl(
    <OrgCreateWidget addOrg={addOrg} showAddOrg />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addOrg.called);
});
