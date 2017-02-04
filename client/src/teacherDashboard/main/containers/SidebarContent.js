import React, { Component, PropTypes } from 'react';
import {Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';
import { teacherLogout, navigateSidebar } from '../../../actions/teacher_actions';

import SidebarPersonal from '../components/SidebarPersonal';

import './../../../App.css';

//=========================================
//            Styles
//=========================================
const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    fontSize: '1.2em',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  }
};


class SidebarContent extends Component {
  constructor(props){
    super(props);

    this.handleSidebar = this.handleSidebar.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleSidebar(value) {
    this.props.navigateSidebar(value);
  }

  handleLogout() {
    this.props.teacherLogout();
    this.context.router.push('/');
  }

  render() {
    const style = styles.sidebar;

    return (
      <SidebarPersonal teacher={this.props.tData.teacher} tId={this.props.tId} style={style}>
        <div style={styles.content}>
          <a href="#" 
            style={styles.sidebarLink}
            onClick={() => this.handleSidebar('')}>
          <Glyphicon className="icon" glyph="dashboard" /> Dashboard
          </a>
          <a href="#" 
            style={styles.sidebarLink}
            onClick={() => this.handleSidebar('Students')}>
          <Glyphicon className="icon" glyph="education" /> Students
          </a>
          <a href="#" 
            style={styles.sidebarLink}
            onClick={() => this.handleSidebar('Lectures')}>
          <Glyphicon className="icon" glyph="book" /> Lectures
          </a>
          <div style={styles.divider} />
            <a href="#"
            style={styles.sidebarLink}
            onClick={() => this.handleLogout()}>
          <Glyphicon className="icon" glyph="log-out" /> Logout
          </a>
        </div>
      </SidebarPersonal>
    );
  }
};

function mapStateToProps(state) {
  return {
    tId: state.teacherState.tId,
    tData: state.teacherState.tData
  }
}

export default connect(mapStateToProps, { teacherLogout, navigateSidebar })(SidebarContent);