import { ADD_PERSON, ADD_PEOPLE, DELETE_PERSON } from './PersonActions';

// Initial State
const initialState = { data: [] };

const PersonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PERSON :
      return {
        data: [action.person, ...state.data],
      };

    case ADD_PEOPLE :
      return {
        data: action.people,
      };

    case DELETE_PERSON :
      return {
        data: state.data.filter(person => person.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all people
export const getPeople = state => state.people.data;

// Get person by cuid
export const getPerson = (state, cuid) => state.people.data.filter(person => person.cuid === cuid)[0];

// Export Reducer
export default PersonReducer;
