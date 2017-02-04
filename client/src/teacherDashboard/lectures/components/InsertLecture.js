import React, {Component} from 'react';
import {ListGroupItem, ControlLabel, Button, Glyphicon} from 'react-bootstrap';
import {Form, FormGroup, FormControl} from 'react-bootstrap';

import './../../../App.css';

class InsertLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lectureName: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleLectureChange = this.handleLectureChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  componentDidMount(){
    this.input.focus();
  }

  handleLectureChange(e) {
    this.setState({ lectureName: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.handleAddLecture(this.state.lectureName);
      this.props.revertButton();
    }
  }


  render() {
    console.log('rendering');
    return (
      <ListGroupItem >
      <Form inline>
          <FormControl
            className="invis"
            type="text"
            inputRef={ref => { this.input = ref; }}
            value={this.state.lectureName}
            onChange={this.handleLectureChange}
            onKeyPress={(e) => this.handleKeyPress(e)} />
      </Form>
    </ListGroupItem>
    );
  }
}

export default InsertLecture;

//onKeyPress={(e) => this.props.handleAddLecture(e, this.state.lectureName)}