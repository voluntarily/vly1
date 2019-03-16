import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_ACT = 'ADD_ACT';
export const ADD_ACTS = 'ADD_ACTS';
export const DELETE_ACT = 'DELETE_ACT';

// Export Actions
export function addAct(act) {
  return {
    type: ADD_ACT,
    act,
  };
}

export function addActRequest(act) {
  return (dispatch) => {
    return callApi('activities', 'post', {
      activity: {
        title: act.title,
        description: act.description,
        type: act.type,
      },
    }).then(res => dispatch(addAct(res.activity)));
  };
}

export function addActs(acts) {
  return {
    type: ADD_ACTS,
    acts,
  };
}

export function fetchActs() {
  return (dispatch) => {
    return callApi('activities').then(res => {
      dispatch(addActs(res.activities));
    });
  };
}

export function fetchAct(cuid) {
  return (dispatch) => {
    return callApi(`activities/${cuid}`).then(res => dispatch(addAct(res.activity)));
  };
}

export function deleteAct(cuid) {
  return {
    type: DELETE_ACT,
    cuid,
  };
}

export function deleteActRequest(cuid) {
  return (dispatch) => {
    return callApi(`activities/${cuid}`, 'delete').then(() => dispatch(deleteAct(cuid)));
  };
}
