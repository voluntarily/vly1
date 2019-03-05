// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_ADD_ORG } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddOrg: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
    case TOGGLE_ADD_ORG:
      return {
        showAddOrg: !state.showAddOrg,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;
export const getShowAddOrg = state => state.app.showAddOrg;

// Export Reducer
export default AppReducer;
