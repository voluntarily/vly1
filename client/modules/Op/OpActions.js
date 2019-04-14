import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_OP = 'ADD_OP';
export const ADD_OPS = 'ADD_OPS';
export const DELETE_OP = 'DELETE_OP';

/* post a new opportunity to the database,
   add the result to the state
*/

export const addOpRequest = (op) => {
  return (dispatch) => {
    return callApi('opportunities', 'post', {
      opportunity: op,
    }).then((res) => {
      if (res.opportunity && !op.cuid) {
        // only add to the store if new record.
        dispatch({ type: ADD_OP, op: res.opportunity });
        return res.opportunity;
      }
      return null;
    });
  };
};

/*
  get a full list of opportunities from the server
  and add to the state.
*/
export const fetchOps = () => {
  return (dispatch) => {
    return callApi('opportunities').then(res => {
      dispatch({ type: ADD_OPS, ops: res.opportunities });
    });
  };
};

export const fetchOp = (cuid) => {
  return (dispatch) => {
    return callApi(`opportunities/${cuid}`)
      .then((res, err) => {
        if (err) {
          // console.log('invalid cuid', err);
        } else {
          // res could be a 404 etc. check success
          if (res.opportunity) {
            dispatch({ type: ADD_OP, op: res.opportunity });
          }
        }
      }
    );
  };
};

export const deleteOpRequest = (cuid) => {
  return (dispatch) => {
    return callApi(`opportunities/${cuid}`, 'delete')
    .then(() => dispatch({ type: DELETE_OP, cuid }));
  };
};
