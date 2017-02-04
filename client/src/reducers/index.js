import { combineReducers } from 'redux';
import TeacherReducer from './reducer_teacher';
import StudentReducer from './reducer_student';
import AdminReducer from './reducer_admin';
import TeacherInputReducer from './reducer_teacherInput';

const rootReducer = combineReducers({
  teacherState: TeacherReducer,
  studentState: StudentReducer,
  adminState: AdminReducer,
  teacherInputState: TeacherInputReducer
});

export default rootReducer;