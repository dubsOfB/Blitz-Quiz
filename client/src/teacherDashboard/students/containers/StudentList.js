import React, {Component} from 'react';
import ImportedStudents from '../components/ImportedStudents';
import AvailableStudents from '../components/AvailableStudents';
import StudentPhoto from '../components/StudentPhoto';
import axios from 'axios';
import { connect } from 'react-redux';


class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        class: this.props.selectedClass,
        importedStudents: [],
        availableStudents: [],
        photo: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.serverRequest = this.serverRequest.bind(this);
    this.addStudents = this.addStudents.bind(this);
    this.removeStudents = this.removeStudents.bind(this);
  }

  serverRequest() {
    axios.get('/api/students').then(data => {
      var arr = data.data.map((student, index) => {
        return {
          id: student.id, 
          firstName: student.firstName,
          lastName: student.lastName
          // photo: student.photo
        }
      })
      this.setState({
        availableStudents: arr
      })
    })
    .catch(err => {
      console.log('error in student list component did mount', err);
    });
  }

  componentDidMount() {
    this.serverRequest();
  }



  addStudents(index, row) {
    this.state.availableStudents.splice(index, 1)
    this.state.importedStudents.push(row)
    this.setState({
      importedStudents: this.state.importedStudents,
      availableStudents: this.state.availableStudents
    })
  }

  removeStudents(index, row) {
    this.state.availableStudents.push(row)
    this.state.importedStudents.splice(index, 1)
    this.setState({
      importedStudents: this.state.importedStudents,
      availableStudents: this.state.availableStudents
    })
  }

  // changePhoto (newPhoto) {
  //   this.setState({
  //     photo: newPhoto
  //   })
  //   // console.log(this.state.photo)
  // }

  render() {
    return (
      <div className="row">
        <div className="col-sm-8">
          <ImportedStudents
            data={this.state.importedStudents}
            removeStudents={this.removeStudents}
          />
          
          <AvailableStudents
            data={this.state.availableStudents}
            addStudents={this.addStudents}
          />

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { selectedClass: state.teacherState.selectedClass };
}

export default connect(mapStateToProps)(StudentList);