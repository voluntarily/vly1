import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_ORG = 'ADD_ORG';
export const ADD_ORGS = 'ADD_ORGS';
export const DELETE_ORG = 'DELETE_ORG';

// Export Actions
export function addOrg(org) {
  return {
    type: ADD_ORG,
    org,
  };
}

export function addOrgRequest(org) {
  return (dispatch) => {
    return callApi('organisations', 'post', {
      organisation: {
        name: org.name,
        about: org.about,
        type: org.type,
      },
    }).then(res => dispatch(addOrg(res.organisation)));
  };
}

export function addOrgs(orgs) {
  return {
    type: ADD_ORGS,
    orgs,
  };
}

export function fetchOrgs() {
  return (dispatch) => {
    return callApi('organisations').then(res => {
      dispatch(addOrgs(res.organisations));
    });
  };
}

export function fetchOrg(cuid) {
  return (dispatch) => {
    return callApi(`organisations/${cuid}`).then(res => dispatch(addOrg(res.organisation)));
  };
}

export function deleteOrg(cuid) {
  return {
    type: DELETE_ORG,
    cuid,
  };
}

export function deleteOrgRequest(cuid) {
  return (dispatch) => {
    return callApi(`organisations/${cuid}`, 'delete').then(() => dispatch(deleteOrg(cuid)));
  };
}
