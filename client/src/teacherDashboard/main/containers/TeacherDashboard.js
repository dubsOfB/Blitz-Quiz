import React, { Component, PropTypes } from 'react';
import Sidebar from 'react-sidebar';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTeacherData } from '../../../actions/teacher_actions';
import { Link } from 'react-router';

import SidebarContent from './SidebarContent';
import SidebarTopArea from './SidebarTopArea';
import MainBody from './MainBody';


const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    padding: '16px',
  },
};

class TeacherDashboard
 extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      docked: false,
      open: false,
      // teacher: {firstName: 'EJ', lastName: 'Mason', photo: "http://starcasm.net/wp-content/uploads/2015/08/Jared-Fogle-in-Subway-Ad.jpg"},
      // allClasses: [],
      // selectedClass: {id: 4, className: 'Biology 100'},
      // navigation: '',
      loaded: false,
      // tId: 1053,
      socket: null
    };

    // this.handleSideNav = this.handleSideNav.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

//=========================================
//            Begin Methods
//=========================================
  // handleSideNav(e, location) {
  //   e.preventDefault();

  //   this.setState({
  //     navigation: location
  //   });
  // }

  // backtoLogin() {
  //   this.props.logout();
  // }

  // onSetOpen(open) {
  //   this.setState({open: open});
  // }

  // mediaQueryChanged() {
  //   this.setState({docked: this.state.mql.matches});
  // }

  // toggleOpen(e) {
  //   this.setState({open: !this.state.open});
  //   if (e) {
  //     e.preventDefault();
  //   }
  // }

  componentWillMount() {
  //   const mql = window.matchMedia(`(min-width: 800px)`);
  //   mql.addListener(this.mediaQueryChanged.bind(this));
  //   this.setState({mql: mql, docked: mql.matches});
  }

  // componentWillUnmount() {
  //   this.state.mql.removeListener(this.mediaQueryChanged.bind(this));
  //   console.log('component will unmount');
  // }

  componentDidMount() {
    if(!this.props.tId) {
      console.log(this.props.tId);
      this.context.router.push('/');
    }
    // this.props.getTeacherData(this.props.tId);
    // axios.get('/test/' + this.state.tId).then(response => {
    //     console.log('this is the response: ', response);
    //     this.setState({
    //       teacher: response.data.teacher,
    //       allClasses: response.data.classes,
    //       selectedClass: response.data.classes[2],
    //       loaded: true
    //     });
    // })
    //   .catch(err => {
    //     console.log('error: ', err);
    //   })
  }

  // selectClass(someClass) {
  //    this.setState({selectedClass: someClass, navigation: ''});
  // }

//=========================================
//            Render
//=========================================
  render() {
    const contentHeader = (
      <span>
        {!this.state.docked &&
         <a href="#" style={styles.contentHeaderMenuLink}>=</a>}
        <span> React Sidebar</span>
      </span>);

    const sidebarProps = {
      sidebar: <SidebarContent />,
      docked: true,
      open: true
    };
    
    return (
      <Sidebar {...sidebarProps}>
        <SidebarTopArea title={contentHeader}>

          <div>
            <MainBody />
          </div>

        </SidebarTopArea>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return { 
    tId: state.teacherState.tId
  }
}

export default connect(mapStateToProps, { getTeacherData })(TeacherDashboard)
;