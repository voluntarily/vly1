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
  require('./modules/Org/pages/OrgListPage/OrgListPage');
  require('./modules/Org/pages/OrgDetailPage/OrgDetailPage');
  require('./modules/Person/pages/PersonListPage/PersonListPage');
  require('./modules/Person/pages/PersonDetailPage/PersonDetailPage');
  require('./modules/Person/pages/PersonUpdatePage/PersonUpdatePage');
  require('./modules/Person/components/PersonDetailForm/PersonDetailForm');
  require('./modules/Op/pages/OpListPage/OpListPage');
  require('./modules/Op/pages/OpDetailPage/OpDetailPage');
  require('./modules/Op/pages/OpUpdatePage/OpUpdatePage');
  require('./modules/Op/components/OpDetailForm/OpDetailForm');
  require('./modules/Act/pages/ActListPage/ActListPage');
  require('./modules/Act/pages/ActDetailPage/ActDetailPage');
  require('./modules/Showcase/Showcase');
  require('./modules/Landing/Landing');
  require('./modules/About/About');
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Landing/Landing').default);
        });
      }}
    />
    <Route path="/posts" component={Frame} >
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
    </Route>
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


    <Route path="/ops" component={Frame} >
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Op/pages/OpListPage/OpListPage').default);
          });
        }}
      />
      <Route
        path="/ops/:cuid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Op/pages/OpDetailPage/OpDetailPage').default);
          });
        }}
      />
      <Route
        path="/ops/:cuid/edit"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Op/pages/OpUpdatePage/OpUpdatePage').default);
          });
        }}
      />
    </Route>

    <Route path="/acts" component={Frame} >
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Act/pages/ActListPage/ActListPage').default);
          });
        }}
      />
      <Route
        path="/acts/:cuid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Act/pages/ActDetailPage/ActDetailPage').default);
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
      <Route
        path="/people/:cuid/edit"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Person/pages/PersonUpdatePage/PersonUpdatePage').default);
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
    <Route path="/about" component={Frame} >
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/About/About').default);
          });
        }}
      />
    </Route>
  </Route>


);
