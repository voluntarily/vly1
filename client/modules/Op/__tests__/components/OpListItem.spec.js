import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import OpListItem from '../../components/OpListItem/OpListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const op = {
  cuid: 'f34gb2bh24b24b2',
  name: 'OMGTech',
  slug: 'hello-omgtech',
  about: 'OMGTech! develops & delivers engaging workshops for both teachers and students on digital technologies and how to explore and invent with them',
  type: 'activity-provider',
};

const props = {
  op,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <OpListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-op'));
  t.is(wrapper.find('Link').first().prop('children'), op.name);
  t.regex(wrapper.find('.op-about').first().text(), new RegExp(op.about));
  t.is(wrapper.find('.op-type').first().text(), op.type);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <OpListItem {...props} />
  );

  t.deepEqual(wrapper.prop('op'), props.op);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <OpListItem op={op} onDelete={onDelete} />
  );

  wrapper.find('.opDelete').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
