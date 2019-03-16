/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import orgs from './modules/Org/OrgReducer';
import ops from './modules/Op/OpReducer';
import acts from './modules/Act/ActReducer';
import people from './modules/Person/PersonReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  orgs,
  ops,
  acts,
  people,
  intl,
});
