import React from 'react';
import {ListGroupItem, Glyphicon} from 'react-bootstrap';

import Question from './Question';

const QuestionsList = (props) => {
  const components = props.questions.map((question, i) => {
    return (
       <Question question={question}
        handleSubmitNewQuestion={props.handleSubmitNewQuestion}
        socket={props.socket}
        classId={props.classId}
        number={i}
        key={i} />
    )});

  const newComponents = props.newQuestions.map((question, i) => {
    return (
       <Question question={question}
        handleSubmitNewQuestion={props.handleSubmitNewQuestion}
        number={i}
        key={i} />
    )});
  
  return (
    <div>
      {components}

      {newComponents}

      <ListGroupItem href="#" onClick={props.handleAddQuestion}>
        <Glyphicon glyph="plus" /> Add New Question
      </ListGroupItem>
      
    </div>
  );
};

export default QuestionsList;