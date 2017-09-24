/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Kanban from './modules/Kanban/KanbanContainer';
import Start from './modules/Start/Start';

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
  require('./modules/Kanban/KanbanContainer');
  require('./modules/User/UserLogin');
  // require('./modules/Post/pages/PostDetailPage/PostDetailPage');
}

// const history = createHistory();
// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/

// ====================== DZIAŁAJĄCY FRAGMENT ==========================
export default (
  <Route path="/" component={Start}>
    <Route path="/kanban/:id" component={Kanban} />
  </Route>
);
// ====================== DZIAŁAJĄCY FRAGMENT ==========================

// getComponent={(nextState, cb) => {
//   require.ensure([], require => {
//     cb(null, require('./modules/User/UserLogin').default);
//   });
// }}
// ==========================================================================================================
/* eslint-disable global-require */

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
// export default (
//   <Route path="/" component={Start}>
//     <IndexRoute
//       getComponent={(nextState, cb) => {
//         require.ensure([], require => {
//           cb(null, require('./modules/Start/Start').default);
//         });
//       }}
//     />
//     <Route
//       path="/kanbans/:kanbanId"
//       getComponent={(nextState, cb) => {
//         require.ensure([], require => {
//           cb(null, require('./modules/Kanban/KanbanContainer').default);
//         });
//       }}
//     />
//   </Route>
// );
