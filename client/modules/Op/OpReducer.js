import { ADD_OP, ADD_OPS, DELETE_OP } from './OpActions';

// Initial State
const initialState = { data: [] };

const OpReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OP :
      return {
        data: [action.op, ...state.data],
      };

    case ADD_OPS :
      return {
        data: action.ops,
      };

    case DELETE_OP :
      return {
        data: state.data.filter(op => op.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all ops
export const getOps = state => state.ops.data;

// Get op by cuid
export const getOp = (state, cuid) => state.ops.data.filter(op => op.cuid === cuid)[0];

// Export Reducer
export default OpReducer;
