// Import Actions
import {
  TOGGLE_ADD_POST,
  TOGGLE_ADD_ORG,
  TOGGLE_ADD_PERSON,
  TOGGLE_LOGIN_FORM,
} from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddOrg: false,
  showAddPerson: false,
  showLoginForm: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return Object.assign({}, state, {
        showAddPost: !state.showAddPost,
      });
    case TOGGLE_ADD_ORG:
      return Object.assign({}, state, {
        showAddOrg: !state.showAddOrg,
      });
    case TOGGLE_ADD_PERSON:
      return Object.assign({}, state, {
        showAddOrg: !state.showAddPerson,
      });
    case TOGGLE_LOGIN_FORM:
      return Object.assign({}, state, {
        showLoginForm: !state.showLoginForm,
      });
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;
export const getShowAddOrg = state => state.app.showAddOrg;
export const getShowAddPerson = state => state.app.showAddPerson;
export const getShowLoginForm = state => state.app.showLoginForm;

// Export Reducer
export default AppReducer;
