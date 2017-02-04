import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';


const QuestionsStats = (props) => {
    let questionsInDescendingOrder = props.questionData;
    questionsInDescendingOrder.sort(function(a,b){
      return (a.perCentage > b.perCentage) ? 1 : ((b.perCentage > a.perCentage) ? -1 : 0);
    } ); 
    let lineItem = (question, i) => {
      if(question.perCentage <= 60){
        return(
        <ListGroupItem style={{color:'red',fontSize:20}} key={i}>
          <strong key={i}>#{question.index} {question.question}<br key={i} />
          {question.perCentage}%</strong> of the students got this answer correct
          </ListGroupItem>
        )
      } else {
        return (
          <ListGroupItem style={{color:'black',fontSize:15}} key={i}>
          <strong key={i}>#{question.index} {question.question}<br key={i} />
          {question.perCentage}%</strong> of the students got this answer correct
          </ListGroupItem>
        )
      }
    }

  return (
      <ListGroup>
      {questionsInDescendingOrder.map((question, i) => (
        lineItem(question, i)
      ))}
      </ListGroup>   
  );
};

export default QuestionsStats;