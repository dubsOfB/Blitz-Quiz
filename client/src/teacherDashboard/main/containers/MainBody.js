import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import LectureDashboard from './../../lectures/containers/LectureDashboard';
import StudentList from '../../students/containers/StudentList';
import HomeDashboard from '../components/HomeDashboard';


class MainBody extends Component {
  constructor(props) {
    super(props);
    // console.log('Inside body component', props)
    this.state = {
      // tests: [],
      // students: this.props.selStudents || [],
      // currentClass: this.props.currentClass
    };
  }

  // componentWillReceiveProps(nextProps){
  //   this.setState({
  //     tests: nextProps.selTests || [],
  //     students: nextProps.selStudents || [],
  //     currentClass: nextProps.currentClass
  //   })
  // }

  render() {
    let navigator = null;

    if(this.props.destination === ''){
      navigator = (
        <div>
          <HomeDashboard />
        </div>
      )
    } else if (this.props.destination === 'Students') {
      navigator = (
        <div>
          <StudentList />
        </div>
      );
    } else if (this.props.destination === 'Lectures') {
      console.log('selectedclass in lectures : ', this.props.selectedClass);
      navigator = (
        <div>
          <LectureDashboard />
    	  </div>
      );
    }

    return (
      <div>
        {navigator}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    destination: state.teacherState.destination,
    selectedClass: state.teacherState.selectedClass
  };
}

export default connect(mapStateToProps)(MainBody);