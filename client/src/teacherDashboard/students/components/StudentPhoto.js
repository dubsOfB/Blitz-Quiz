import React, {Component} from 'react';

const styles = {
    height: "400px",
    width: "400px"
}

class StudentPhoto extends Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(props) {   
  }

  render() { 
    return (
        <div >
          <img src = {this.props.photo} style={styles}/>
        </div>
    )
  }
}

export default StudentPhoto;