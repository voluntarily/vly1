import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { OpCreateWidget } from '../../components/OpCreateWidget/OpCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addOp: () => {},
  cancelOp: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <OpCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  // t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewOp" />));
  t.is(wrapper.find('input').length, 2);
//  t.is(wrapper.find('textarea').length, 1);
});


test('has correct props', t => {
  const wrapper = mountWithIntl(
    <OpCreateWidget {...props} />
  );

  t.is(wrapper.prop('addOp'), props.addOp);
  t.is(wrapper.prop('cancelOp'), props.cancelOp);
//  t.is(wrapper.prop('showAddOp'), props.showAddOp);
});

test('calls addOp', t => {
  const addOp = sinon.spy();
  const cancelOp = sinon.spy();

  const wrapper = mountWithIntl(
    <OpCreateWidget addOp={addOp} cancelOp={cancelOp} value="admin" />
  );

  wrapper.ref('name').value = 'Test Opportunities';
  wrapper.ref('about').value = 'Some About';
// TODO work out how to set the select item from the tester
//  wrapper.ref('type').value = 'tester';
  wrapper.find('button.submitOp').first().simulate('click');
  // console.log(addOp.aps);
  t.truthy(addOp.calledOnce);
  t.truthy(addOp.calledWith('Test Opportunities', 'Some About', 'corporate'));
});

test('empty form doesn\'t call addOp', t => {
  const addOp = sinon.spy();
  const cancelOp = sinon.spy();

  const wrapper = mountWithIntl(
    <OpCreateWidget addOp={addOp} cancelOp={cancelOp} />
  );

  wrapper.find('button.submitOp').first().simulate('click');
  t.falsy(addOp.calledOnce);
});

test('Cancel form calls canceOp', t => {
  const cancelOp = sinon.spy();
  const addOp = sinon.spy();
  const wrapper = mountWithIntl(
    <OpCreateWidget addOp={addOp} cancelOp={cancelOp} />
  );

  wrapper.find('button.cancelOp').first().simulate('click');
  t.falsy(addOp.called);
  t.truthy(cancelOp.called);
});
