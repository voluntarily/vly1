import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import ActListItem from '../../components/ActListItem/ActListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const act = {
  cuid: 'f34gb2bh24b24b2',
  title: 'OMGTech',
  slug: 'hello-omgtech',
  description: 'OMGTech! develops & delivers engaging workshops for both teachers and students on digital technologies and how to explore and invent with them',
  type: 'activity-provider',
};

const props = {
  act,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <ActListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-act'));
  t.is(wrapper.find('Link').first().prop('children'), act.title);
  t.regex(wrapper.find('.act-description').first().text(), new RegExp(act.description));
  t.is(wrapper.find('.act-type').first().text(), act.type);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <ActListItem {...props} />
  );

  t.deepEqual(wrapper.prop('act'), props.act);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <ActListItem act={act} onDelete={onDelete} />
  );

  wrapper.find('.actDelete').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
