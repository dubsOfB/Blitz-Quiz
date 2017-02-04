import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Admin from './auth/containers/Admin';
import Login from './auth/containers/Login';
import Register from './auth/containers/Register';
import TeacherDashboard from './teacherDashboard/main/containers/TeacherDashboard';
import StudentDashboard from './studentDashboard/containers/StudentDashboard';

export default (
<Route path="/" component={App}>
  <IndexRoute component={Login} />
  <Route path="admin" component={Admin} />
  <Route path="register" component={Register} />
  <Route path="teacher" component={TeacherDashboard} />
  <Route path="student" component={StudentDashboard} />
</Route>
)

//this.prop.params.id (path="posts/:id")