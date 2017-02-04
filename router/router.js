
module.exports = app => {
  app.use('/login', require('./routes/studentLogin'));
  app.use('/login', require('./routes/teacherLogin'));
  app.use('/registerStudent', require('./routes/registerStudent'));
  app.use('/registerTeacher', require('./routes/registerTeacher'));
  app.use('/api', require('./routes/students'));
  app.use('/test', require('./routes/tests'));
  app.use('/login', require('./routes/adminLogin'))
};
