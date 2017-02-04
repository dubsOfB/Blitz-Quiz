import React, {Component} from 'react';
import ResultsGraphs from './ResultsGraphs';
import QuestionsStats from './QuestionsStats';
import StudentsScores from './StudentsScores';
import StudentHelp from './StudentHelp'


//axios calls to get studentData and questionData

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTopic: 'Ants',
      studentData: [{name: 'Johnny Storm', perCentage: 55},
      {name: 'Jessie James', perCentage: 90},
      {name: 'Billy Kid', perCentage: 70},
      {name: 'EJ Mason', perCentage: 100},
      {name: 'Bong Chon', perCentage: 100}],
      questionData: [{question: "What's the role of the queen ant?", index: 1, perCentage: 85},
      {question: 'How many legs does the ant have?', index: 2, perCentage: 95},
      {question: "What's the coolest ant around?", index: 3, perCentage: 90},
      {question: "How big is a colony of ants?", index: 4, perCentage: 55},
      {question: "What do ants usually eat?", index: 5, perCentage: 75}]
    };
  }

  render() {
      return(
  	    <div>
          <h3>Results by Question</h3>
          <ResultsGraphs questionData={this.state.questionData}>
          </ResultsGraphs>

          <h3>Lowest to Highest per centage of correct answers</h3>
          <QuestionsStats questionData={this.state.questionData}>
          </QuestionsStats>

          <h3>Results by Student</h3>
          <StudentsScores studentData={this.state.studentData}>
          </StudentsScores>

          <h3>Any Student need any additional help with this material at this time?</h3>
         <StudentHelp studentData={this.state.studentData}>
         </StudentHelp>
  	    </div>
      )
	}
}

export default Results;