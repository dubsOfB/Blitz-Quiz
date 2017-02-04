const Sequelize = require('sequelize');
const sequelize = require('./../db/config');

const Student = require('./../models/students.model');
const Class = require('./../models/classes.model');
const Test = require('./../models/tests.model');

module.exports.addStudentToCLass = (classId, studentId) => {
  Student.findById(studentId).then(foundStudent => {
    Class.addStudent()
  })
}

module.exports.removeStudentFromClass = (classId, studentId) => {

}

module.exports.getAllStudentsFromClass = (classId) => {

}

module.exports.getAllStudentsNotInClass = (classId) => {

}

module.exports.getClassTests = (classId) => {

}

module.exports.saveClassTests = (classId) => {

}