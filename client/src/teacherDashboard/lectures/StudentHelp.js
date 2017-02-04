import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';


const StudentHelp = (props) => {
    let studentData = props.studentData;
    let strugglingStudents = [];
    for(var i = 0; i < studentData.length; i++){
        if(studentData[i].perCentage <= 60){
            strugglingStudents.push(studentData[i])
        }
    }
    let studentInfo = () => {
      if(strugglingStudents.length > 0){
        return(
            <ListGroup>
                {strugglingStudents.map((student, i) => (
                <ListGroupItem style={{fontSize:16}} key={i}>
                <strong style={{color:'red'}}>{student.name}</strong> got a {student.perCentage} in this test.
                </ListGroupItem> 
        ))}
        </ListGroup>
        )
      } else {
        return (
          <h4>No Student is struggling with this material.</h4>
        )
      }
    }

  return (
      studentInfo() 
  );
};

export default StudentHelp;