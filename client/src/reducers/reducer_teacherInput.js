import { ADD_LECTURE, REMOVE_NEW } from '../actions/teacherInput_actions';

const INITIAL_STATE = { newTests: []};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

  case ADD_LECTURE:
    return {...state, newTests: state.newTests.concat.apply([], action.payload) };

  case REMOVE_NEW:
    return INITIAL_STATE;

  default:
    return state;
  }
}