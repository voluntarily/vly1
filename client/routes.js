/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import Frame from './modules/Frame/Frame';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./modules/Org/pages/OrgListPage/OrgListPage');
  require('./modules/Org/pages/OrgDetailPage/OrgDetailPage');

  require('./modules/Person/pages/PersonListPage/PersonListPage');
  require('./modules/Person/pages/PersonDetailPage/PersonDetailPage');
  require('./modules/Showcase/Showcase');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
    <Route
      path="/posts/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
        });
      }}
    />

    <Route path="/orgs" component={Frame} >
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Org/pages/OrgListPage/OrgListPage').default);
          });
        }}
      />
      <Route
        path="/orgs/:cuid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Org/pages/OrgDetailPage/OrgDetailPage').default);
          });
        }}
      />
    </Route>

    <Route path="/people" component={Frame} >
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Person/pages/PersonListPage/PersonListPage').default);
          });
        }}
      />
      <Route
        path="/people/:cuid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Person/pages/PersonDetailPage/PersonDetailPage').default);
          });
        }}
      />
    </Route>

    <Route path="/showcase" component={Frame} >
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Showcase/Showcase').default);
          });
        }}
      />

    </Route>
  </Route>


);
