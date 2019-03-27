#!/usr/bin/env node
/* Remove all people from the database who have the role tester */
/* eslint-disable no-console */
const axios = require('axios');

const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deletePerson = async personId => {
  try {
    // eslint-disable-next-line prefer-template
    const url = 'http://localhost:8000/api/people/' + personId;
    const response = await axios.delete(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

getData('http://localhost:8000/api/people')
  .then(people => {
    console.log(people);
    // eslint-disable-next-line array-callback-return consistent-return
    people.people.map(p => {
      if (p.role === 'tester') {
        console.log('deleting:', p.name);
        return deletePerson(p.cuid);
      }
    });
  });

