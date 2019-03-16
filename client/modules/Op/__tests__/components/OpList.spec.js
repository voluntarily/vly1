import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import OpList from '../../components/OpList';

// Initial opportunitiess added into test db
const ops = [
  {
    cuid: 'f34gb2bh24b24b2',
    name: 'OMGTech',
    slug: 'hello-omgtech',
    about: "All cats meow 'mern!'",
    type: 'corporate',
  },
  {
    cuid: 'f34gb2bh24b24b3',
    name: 'Datacom',
    slug: 'hi-datacom',
    about: "All dogs bark 'mern!'",
    type: 'corporate',
  },
];


test('renders the list', t => {
  const wrapper = shallow(
    <OpList ops={ops} handleShowOp={() => {}} handleDeleteOp={() => {}} />
  );

  t.is(wrapper.find('OpListItem').length, 2);
});
