import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { ActCreateWidget } from '../../components/ActCreateWidget/ActCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addAct: () => {},
  cancelAct: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <ActCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  // t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewAct" />));
  t.is(wrapper.find('input').length, 2);
//  t.is(wrapper.find('textarea').length, 1);
});


test('has correct props', t => {
  const wrapper = mountWithIntl(
    <ActCreateWidget {...props} />
  );

  t.is(wrapper.prop('addAct'), props.addAct);
  t.is(wrapper.prop('cancelAct'), props.cancelAct);
//  t.is(wrapper.prop('showAddAct'), props.showAddAct);
});

test('calls addAct', t => {
  const addAct = sinon.spy();
  const cancelAct = sinon.spy();

  const wrapper = mountWithIntl(
    <ActCreateWidget addAct={addAct} cancelAct={cancelAct} value="admin" />
  );

  wrapper.ref('title').value = 'Test Activity';
  wrapper.ref('description').value = 'Some About';
// TODO work out how to set the select item from the tester
//  wrapper.ref('type').value = 'tester';
  wrapper.find('button.submitAct').first().simulate('click');
  // console.log(addAct.args);
  t.truthy(addAct.calledOnce);
  t.truthy(addAct.calledWith('Test Activity', 'Some About', 'corporate'));
});

test('empty form doesn\'t call addAct', t => {
  const addAct = sinon.spy();
  const cancelAct = sinon.spy();

  const wrapper = mountWithIntl(
    <ActCreateWidget addAct={addAct} cancelAct={cancelAct} />
  );

  wrapper.find('button.submitAct').first().simulate('click');
  t.falsy(addAct.calledOnce);
});

test('Cancel form calls canceAct', t => {
  const cancelAct = sinon.spy();
  const addAct = sinon.spy();
  const wrapper = mountWithIntl(
    <ActCreateWidget addAct={addAct} cancelAct={cancelAct} />
  );

  wrapper.find('button.cancelAct').first().simulate('click');
  t.falsy(addAct.called);
  t.truthy(cancelAct.called);
});
