import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import ActList from '../../components/ActList';

// Initial activities added into test db
const acts = [
  {
    cuid: 'f34gb2bh24b24b2',
    title: 'OMGTech',
    slug: 'hello-omgtech',
    description: "All cats meow 'mern!'",
    type: 'corporate',
  },
  {
    cuid: 'f34gb2bh24b24b3',
    title: 'Datacom',
    slug: 'hi-datacom',
    description: "All dogs bark 'mern!'",
    type: 'corporate',
  },
];


test('renders the list', t => {
  const wrapper = shallow(
    <ActList acts={acts} handleShowAct={() => {}} handleDeleteAct={() => {}} />
  );

  t.is(wrapper.find('ActListItem').length, 2);
});
