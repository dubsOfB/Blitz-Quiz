import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap';

import Lecture from './Lecture';
import InsertLecture from './InsertLecture';

import './../../../App.css';

class LectureBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderAdd: true
    };
    this.handleNewClick = this.handleNewClick.bind(this);
    this.revertButton = this.revertButton.bind(this);
  }

  handleNewClick(e) {
    e.preventDefault();
    this.setState({renderAdd: false});
  }

  revertButton() {
    this.setState({renderAdd: !(this.state.renderAdd)});
  }

  render() {
    let button = <ListGroupItem href="#" onClick={this.handleNewClick}>
                   <Glyphicon glyph="plus" /> Add New Lecture
                 </ListGroupItem>

    let txtBox = <InsertLecture 
                    handleAddLecture={this.props.handleAddLecture}
                    revertButton={this.revertButton}
                  />
                  
    let lecturesList = this.props.tests.map((test, i) => 
                        <Lecture test={test}
                          selectLectureHandler={this.props.selectLectureHandler}
                          key={i} />)

    let addLecture = (this.state.renderAdd) ? button : txtBox; 

    return(
      <div>

        <ListGroup>
          {addLecture}
        </ListGroup>

        <ListGroup>
          {lecturesList}
        </ListGroup>

      </div>
    );
  }
}

export default LectureBody;