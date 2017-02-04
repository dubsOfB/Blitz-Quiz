import axios from 'axios';

export const TEACHER_LOGIN = 'TEACHER_LOGIN';
export const TEACHER_LOGOUT = 'TEACHER_LOGOUT';
export const TEACHER_DATA = 'TEACHER_DATA';
export const NAVIGATE_SIDE = 'NAVIGATE_SIDE';
export const SELECT_CLASS = 'SELECT_CLASS';
export const ADD_LECTURE = 'ADD_LECTURE';

export function teacherLogin(tId) {  
  return {
    type: TEACHER_LOGIN,
    payload: tId
  };
}

export function teacherLogout() {  
  return {
    type: TEACHER_LOGOUT,
    payload: null
  };
}

export function getTeacherData(tId) {
  const request = axios.get('/test/' + tId)

  return {
    type: TEACHER_DATA,
    payload: request
  };
}

export function navigateSidebar(location) {
  return {
    type: NAVIGATE_SIDE,
    payload: location
  };
}

export function selectClass(newClass) {
  console.log(newClass);
  return {
    type: SELECT_CLASS,
    payload: newClass
  };
}

// export function addLecture(lectureName) {

//   return {
//     type: SELECT_CLASS,
//     payload: newClass
//   };
// }
