import React from 'react';
import {ListGroup, ListGroupItem, Panel} from 'react-bootstrap';

import QuestionsList from './QuestionsList';

const QuestionsBody = (props) => {
  
  return (
    <div>
      <ListGroup>
        <ListGroupItem onClick={props.handleDeselectLecture}>
          {props.lecture.testName}
        </ListGroupItem>
      </ListGroup>
      
      <QuestionsList questions={props.questions}
        newQuestions={props.newQuestions}
        handleAddQuestion={props.handleAddQuestion} 
        handleSubmitNewQuestion={props.handleSubmitNewQuestion}
        socket={props.socket}
        classId={props.classId}/>
    </div>
  );
};

export default QuestionsBody;