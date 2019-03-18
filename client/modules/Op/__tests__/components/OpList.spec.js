import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import OpList from '../../components/OpList';

// Initial opportunities added into test db
const ops = [
  {
    cuid: '5c951c0a-3e91-436a-81ae-59ede453672a',
    title: 'Growing in the garden',
    subtitle: 'Growing digitally in the garden',
    imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
    description: 'Project to grow something in the garden',
    duration: '15 Minutes',
    location: 'Newmarket, Auckland',
    status: 'draft',
  },
  {
    cuid: '5c951c0a-3e91-436a-81ae-59ede453672b',
    title: 'The first 100 metres',
    subtitle: 'Launching into space',
    imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
    description: 'Project to build a simple rocket that will reach 100m',
    duration: '2 hours',
    location: 'Albany, Auckland',
    status: 'draft',
  },
];

test('renders the list', t => {
  const wrapper = shallow(
    <OpList ops={ops} handleShowOp={() => {}} handleDeleteOp={() => {}} />
  );

  t.is(wrapper.find('OpportunityCard').length, 2);
});
