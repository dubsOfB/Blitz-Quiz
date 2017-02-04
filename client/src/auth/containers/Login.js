import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { teacherLogin, getTeacherData } from '../../actions/teacher_actions';
import { studentLogin } from '../../actions/student_actions';
import { Link } from 'react-router';

import '../../App.css';

const Style = {
	backgroundImage: 'url(http://mrsbarkerscs5.files.wordpress.com/2012/10/cropped-cropped-chalkboard-background-e1350959846138.jpg)',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	top: '0px',
	left: '0px'
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        teacherID: '',
        teacherPassword: '',
        studentID: '',
        studentPassword: ''
    };
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleChangeTeacher(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({[name]: value});
  }

  handleChangeStudent(event) {
    let target = event.target
    let value = target.value
    let name = target.name
    this.setState({
        [name]: value
    });
  }

	handleSubmitTeacher(event) {
		event.preventDefault();
		let stateContext = this;

		axios.post('/login/Teacher', {
			params: {
				Id: this.state.teacherID,
				password: this.state.teacherPassword
			}
		})
		.then(response => {
			if(response.data) {
				this.props.getTeacherData(response.data)
				.then()
				return response.data;
			} else {
				console.log("Unsuccessful Teacher Login");
			}
		})
		.then(tId => {
			this.props.teacherLogin(tId)
		})
		.then(next => {
			this.context.router.push('/teacher')
		})
		.catch((error) => {
			console.log('error in submitTeacher', error);
		});
	}

  handleSubmitStudent(event) {
    event.preventDefault();
    let stateContext = this;

    axios.post('/login/Student', {
        params: {
            Id: this.state.studentID,
            password: this.state.studentPassword
        }
    })
    .then((response) => {
      if (response.data) {
        this.props.studentLogin(response.data);
        this.context.router.push('/student');
      } else {
        console.log("Unsuccessful Student Login");
      }
    })
    .catch((error) => {
        console.log(error);
    });
  }

  render() {
    const { errors } = this.state
    if (this.state.adminPage) {
        return (
            <div>
                <Admin adminPage={this.adminPage.bind(this)}/>
            </div>
        )
    }
    return (
        <div style = {Style}>
            <div className="row">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="modal-header">
                            <h3> BlitzQuiz</h3>
                            <Link to='/admin' className="login loginmodal-submit btn btn-primary">
                                Admin
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="login-modal" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog">
                    <div className ="loginmodal-container ">
                        <h1 className="text-center"> Teacher Login </h1>
                        <form onSubmit={this.handleSubmitTeacher.bind(this)}>
                            <input name="teacherID" type="text" value={this.state.teacherID} onChange={this.handleChangeTeacher.bind(this)} placeholder="UserID"/>
                            <input name="teacherPassword" type="password" value={this.state.teacherPassword} onChange={this.handleChangeTeacher.bind(this)} placeholder="Password"/>
                            <input type="submit" value="Login" className="login loginmodal-submit btn btn-primary"/>
                        </form>
                    </div>
                </div>
            </div>
            <div id="login-modal" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog">
                    <div className ="loginmodal-container">
                        <h1 className="text-center"> Student Login </h1>
                        <form onSubmit={this.handleSubmitStudent.bind(this)}>
                            <input name="studentID" type="text" value={this.state.studentID} onChange={this.handleChangeStudent.bind(this)} placeholder="UserID" />
                            <input name="studentPassword" type="password" value={this.state.studentPassword} onChange={this.handleChangeStudent.bind(this)} placeholder="Password" />
                            <input type="submit" value="Login" className="login loginmodal-submit btn btn-primary" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(null, { teacherLogin, getTeacherData, studentLogin })(Login);

