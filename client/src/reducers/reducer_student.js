import { STUDENT_LOGIN, STUDENT_LOGOUT, NEW_STUDENT_QUESTION, STUDENT_ANSWER, STUDENT_QUESTION} from '../actions/student_actions';

const INITIAL_STATE = { sId: null , studentQuestions : [], sQuestion : {}};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

  case STUDENT_LOGIN:
    return {...state, sId: action.payload };

  case NEW_STUDENT_QUESTION:
    return {...state, studentQuestions : [action.payload, ...state.studentQuestions]};

  case STUDENT_LOGOUT:
    return INITIAL_STATE;

  case STUDENT_ANSWER:
    return {...state, studentQuestions : studentQuestions.splice(0, 1)};

  case STUDENT_QUESTION:
    return {...state, sQuestion : action.payload};
    
  default:
    return state;
  }
}
