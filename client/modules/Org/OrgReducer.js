import { ADD_ORG, ADD_ORGS, DELETE_ORG } from './OrgActions';

// Initial State
const initialState = { data: [] };

const OrgReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORG :
      return {
        data: [action.org, ...state.data],
      };

    case ADD_ORGS :
      return {
        data: action.orgs,
      };

    case DELETE_ORG :
      return {
        data: state.data.filter(org => org.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all orgs
export const getOrgs = state => state.orgs.data;

// Get org by cuid
export const getOrg = (state, cuid) => state.orgs.data.filter(org => org.cuid === cuid)[0];

// Export Reducer
export default OrgReducer;
