import axios from 'axios';

export const ADD_LECTURE = 'ADD_LECTURE';

export function addLecture(newLecture) {  
  return {
    type: ADD_LECTURE,
    payload: newLecture
  };
}
