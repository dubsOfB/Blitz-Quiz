const Sequelize = require('sequelize');
const sequelize = require('./../db/config');

const Student = require('./../models/students.model');

const fetchStudents = (req, res) => {
    
    console.log("fetching students...")
    Student.findAll()
    .then((students) => {
        console.log("students: ", students)
        res.send(students)
        })
    .catch((err) => {
        console.log("error: ", err)
    })
}



module.exports = fetchStudents;