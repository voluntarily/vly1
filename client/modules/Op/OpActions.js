import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_OP = 'ADD_OP';
export const ADD_OPS = 'ADD_OPS';
export const DELETE_OP = 'DELETE_OP';

// Export Actions
/* post a new opportunity to the database,
   add the result to the state
*/
export function addOp(op) {
  return {
    type: ADD_OP,
    op,
  };
}
// QUESTION: why copy each element over instead of whole object?
export function addOpRequest(op) {
  return (dispatch) => {
    return callApi('opportunities', 'post', {
      opportunities: {
        title: op.title,
        subtitle: op.subtitle,
        imgUrl: op.imUrl,
        description: op.description,
        duration: op.duration,
        location: op.location,
      },
    }).then(res => dispatch(addOp(res.opportunities)));
  };
}

/*
  get a full list of opportunities from the server
  and add to the state.
*/
export function addOps(ops) {
  return {
    type: ADD_OPS,
    ops,
  };
}

export function fetchOps() {
  return (dispatch) => {
    return callApi('opportunities').then(res => {
      dispatch(addOps(res.opportunities));
    });
  };
}

export function fetchOp(cuid) {
  return (dispatch) => {
    return callApi(`opportunities/${cuid}`)
      .then(res => dispatch(addOp(res.opportunities)));
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
