import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_PERSON = 'ADD_PERSON';
export const ADD_PEOPLE = 'ADD_PEOPLE';
export const DELETE_PERSON = 'DELETE_PERSON';

export const addPersonRequest = (person) => {
  return (dispatch) => {
    return callApi('people', 'post', {
      person,
    }).then((res) => {
      if (res.person && !person.cuid) {
        // only add to the store if new record.
        dispatch({ type: ADD_PERSON, person: res.person });
        return res.person;
      }
      return null;
    });
  };
};

export const fetchPeople = () => {
  return (dispatch) => {
    return callApi('people').then(res => {
      dispatch({ type: ADD_PEOPLE, people: res.people });
    });
  };
};

export const fetchPerson = (cuid) => {
  return async (dispatch) => {
    const res = await callApi(`people/${cuid}`);
    // res could be a 404 etc. check success
    if (res.person) {
      dispatch({ type: ADD_PERSON, person: res.person });
    }
  };
};

export const deletePersonRequest = (cuid) => {
  return (dispatch) => {
    return callApi(`people/${cuid}`, 'delete')
    .then(() => dispatch({ type: DELETE_PERSON, cuid }));
  };
};
