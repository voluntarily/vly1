import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_PERSON = 'ADD_PERSON';
export const ADD_PEOPLE = 'ADD_PEOPLE';
export const DELETE_PERSON = 'DELETE_PERSON';

// Export Actions
export function addPerson(person) {
  return {
    type: ADD_PERSON,
    person,
  };
}

export function addPersonRequest(person) {
  return (dispatch) => {
    return callApi('people', 'post', {
      person: {
        name: person.name,
        email: person.email,
        role: person.role,
      },
    }).then(res => dispatch(addPerson(res.person)));
  };
}

export function addPeople(people) {
  return {
    type: ADD_PEOPLE,
    people,
  };
}

export function fetchPeople() {
  return (dispatch) => {
    return callApi('people').then(res => {
      dispatch(addPeople(res.people));
    });
  };
}

export function fetchPerson(cuid) {
  return (dispatch) => {
    return callApi(`people/${cuid}`).then(res => dispatch(addPerson(res.person)));
  };
}

export function deletePerson(cuid) {
  return {
    type: DELETE_PERSON,
    cuid,
  };
}

export function deletePersonRequest(cuid) {
  return (dispatch) => {
    return callApi(`people/${cuid}`, 'delete').then(() => dispatch(deletePerson(cuid)));
  };
}
