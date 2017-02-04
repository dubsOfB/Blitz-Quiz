import React,{ Component } from 'react';
import {Media, Image} from 'react-bootstrap';


//=========================================
//            Styles
//=========================================
const styles = {
  root: {
    fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300,
  },
  header: {
    backgroundColor: '#03a9f4',
    color: 'white',
    padding: '17px',
    height: '100px',
    width: '260px'
  },
};


class SidebarPersonal extends Component {
  constructor(props){
    super(props);
  }
  render() {
  let teacher = this.props.teacher;
  const rootStyle = styles.root;
    return (
      <div style={rootStyle}>
        <div style={styles.header}>
          <Media>
            <Media.Left>
              <Image width={64} 
                    height={64} 
                    src={teacher.photo}
                    rounded/>
            </Media.Left>
            <Media.Body>
              <Media.Heading>{teacher.firstName} {teacher.lastName}</Media.Heading>
              <p>{this.props.tId}</p>
            </Media.Body>
          </Media>
        </div>
        {this.props.children}
      </div>
    );
  }
};


export default SidebarPersonal;