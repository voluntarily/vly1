import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_OP = 'ADD_OP';
export const ADD_OPS = 'ADD_OPS';
export const DELETE_OP = 'DELETE_OP';

// Export Actions
export function addOp(op) {
  return {
    type: ADD_OP,
    op,
  };
}

export function addOpRequest(op) {
  return (dispatch) => {
    return callApi('opportunities', 'post', {
      opportunities: {
        name: op.name,
        about: op.about,
        type: op.type,
      },
    }).then(res => dispatch(addOp(res.opportunities)));
  };
}

export function addOps(ops) {
  return {
    type: ADD_OPS,
    ops,
  };
}

export function fetchOps() {
  return (dispatch) => {
    return callApi('opportunities').then(res => {
      dispatch(addOps(res.opportunitiess));
    });
  };
}

export function fetchOp(cuid) {
  return (dispatch) => {
    return callApi(`opportunities/${cuid}`).then(res => dispatch(addOp(res.opportunities)));
  };
}

export function deleteOp(cuid) {
  return {
    type: DELETE_OP,
    cuid,
  };
}

export function deleteOpRequest(cuid) {
  return (dispatch) => {
    return callApi(`opportunities/${cuid}`, 'delete').then(() => dispatch(deleteOp(cuid)));
  };
}
