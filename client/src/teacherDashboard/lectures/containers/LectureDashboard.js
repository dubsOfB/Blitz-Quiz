import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import LectureBody from '../components/LectureBody';
import QuestionsBody from '../components/QuestionsBody';

class LectureDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggler: true,
      tests: this.props.selectedClass.tests || [],
      selectedTest: null,
      selectedQuestions: [],
      newQuestions: []
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.selectLectureHandler = this.selectLectureHandler.bind(this);
    this.handleDeselectLecture = this.handleDeselectLecture.bind(this);
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleSubmitNewQuestion = this.handleSubmitNewQuestion.bind(this);
    this.addQuestions = this.addQuestions.bind(this);
    this.handleAddLecture = this.handleAddLecture.bind(this);
  }

//=========================================
//            Begin Methods
//=========================================
  componentWillMount() {
    var socket = io.connect('/');
    console.log('CONNECTED HERE!!!!!!');
    socket.emit('t_connect', this.props.selectedClass.id);
    this.setState({socket});
  }
  
  componentWillUnmount() {
    // const sock = {
    //   id: this.props.selectedClass.id,
    //   className: this.props.selectedClass.className,
    //   teacher: this.props.tData.teacher
    // }
    // console.log('here')
    // console.log(sock);
  }

  handleAddLecture(testName) {
    var newTest = {
      testName: testName,
      type: 'Lecture',
      classId: this.props.selectedClass.id,
      answers: [],
      questions: []
    };

    axios.post('/test/new', newTest).then(res => {
      console.log('New Lecture sent to server!');
    })
    .catch(err => {
      console.log('error in sending new lecture to server: ', err);
    })

    let newLectureList = this.state.tests.slice();
    newLectureList.unshift(newTest);
    updateTests();
    this.setState({tests: newLectureList, selectedTest: null, selectedQuestions: []});
  }

  updateTests() {
    axios.get('/classes/classTest'+this.props.selectedClass.id).then(res => {
      console.log(res);
    })
  }

  addQuestions() {
    axios.get('/test/' + this.props.tId).then(res => {
      for(let obj of res.data.classes){
        if(obj.id === this.props.classId){
          // this.setState({
          //   tests: obj.tests
          // });
        }
      }
    });
  }

  //Needs to go to base questions and get the selectedQuestions
  selectLectureHandler (e, id) {
    e.preventDefault();
    let foundTest = null;
    for (let test of this.props.selectedClass.tests) {
      if (test.id === id) {
        foundTest = test;
      }
    }
    
    /**
     * Socket
     */
    var socket = io.connect('http://localhost:9000');
    socket.emit('active');

    this.setState({
      selectedTest: foundTest,
      selectedQuestions: foundTest.questions
    });


  }

  handleAddQuestion (e) {
    e.preventDefault();
    let questions = this.state.newQuestions.slice();
    questions.push({type: 'Short Answer', body: '', answer: '', status: 'new', isComplete: false});
    this.setState({
      newQuestions: questions
    });
  }

  handleSubmitNewQuestion (e, type, body, answer) {
    e.preventDefault();
    let obj = {
      type: type, 
      body: body, 
      answer: answer, 
      status: 'incomplete', 
      testId: this.state.selectedTest.id};
    axios.post('/test/question', obj).then(res => {
      this.addQuestions();
    });
    
    let arr = this.state.selectedQuestions.concat([obj]);

    // updateQuestions(arr); 
    this.setState((prevState, props) => {
      return {
        selectedQuestions: arr,
        newQuestions: []
      };
    });
  }

  handleDeselectLecture(e) {
    e.preventDefault();
    this.setState({selectedTest: null, selectedQuestions: []});
  }

//=========================================
//            Render
//=========================================
  render() {
    let item = null;
    if(this.state.selectedTest === null) {
      item = <LectureBody tests={this.state.tests} 
        selectLectureHandler={this.selectLectureHandler}
        handleAddLecture={this.handleAddLecture}/>;
    } else {
      item = <QuestionsBody questions={this.props.selectedQuestions}
        lecture={this.state.selectedTest}
        newQuestions={this.state.newQuestions}
        handleDeselectLecture={this.handleDeselectLecture}
        handleAddQuestion={this.handleAddQuestion} 
        handleSubmitNewQuestion={this.handleSubmitNewQuestion}
        socket={this.state.socket}
        classId={this.state.classId}/>
}
    return (
      <div>
        {item}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    tData: state.teacherState.tData,
    selectedClass: state.teacherState.selectedClass
  }
}

export default connect(mapStateToProps)(LectureDashboard);