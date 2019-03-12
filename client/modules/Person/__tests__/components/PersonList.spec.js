import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import PersonList from '../../components/PersonList';

// Initial personanisations added into test db
const people = [
  {
    cuid: 'f34gb2bh24b24b2',
    name: 'OMGTech',
    slug: 'hello-omgtech',
    email: "All cats meow 'mern!'",
    role: 'corporate',
  },
  {
    cuid: 'f34gb2bh24b24b3',
    name: 'Datacom',
    slug: 'hi-datacom',
    email: "All dogs bark 'mern!'",
    role: 'corporate',
  },
];


test('renders the list', t => {
  const wrapper = shallow(
    <PersonList people={people} handleShowPerson={() => {}} handleDeletePerson={() => {}} />
  );

  t.is(wrapper.find('PersonListItem').length, 2);
});
