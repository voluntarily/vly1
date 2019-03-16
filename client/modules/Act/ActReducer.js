import { ADD_ACT, ADD_ACTS, DELETE_ACT } from './ActActions';

// Initial State
const initialState = { data: [] };

const ActReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACT :
      return {
        data: [action.act, ...state.data],
      };

    case ADD_ACTS :
      return {
        data: action.acts,
      };

    case DELETE_ACT :
      return {
        data: state.data.filter(act => act.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all acts
export const getActs = state => state.acts.data;

// Get act by cuid
export const getAct = (state, cuid) => state.acts.data.filter(act => act.cuid === cuid)[0];

// Export Reducer
export default ActReducer;
