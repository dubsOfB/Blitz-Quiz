const express = require('express');
const router = express.Router();

const Student = require('./../../models/students.model');
const Class = require('./../../models/classes.model');
const Test = require('./../../models/tests.model');
const Storage = require('./../../sockets/storage');
const db = require('./../../db/connection')


router.post('/saveStudent', (req, res)=>{

  let studentId = req.body.student_id;
  let classId = req.body.class_id;

  Student.findById(studentId).then(foundStudent => {
    foundStudent.addClass([classId]).then(result => {
      res.status(200).json({message : 'Successfully Added Student To Class'});
    }).catch(error => {
      res.status(500).send(error);
    }) 
  }).catch(error => {
    res.status(500).send(error);
  })
})

router.get('/removeStudent/:student_id/:class_id', (req, res)=>{

  let studentId = req.params.student_id;
  let classId = req.params.class_id;

  Student.findById(studentId).then(foundStudent => {
    foundStudent.removeClass([classId]).then(result => {
      res.status(200).json({message : 'Successfully Removed Student From Class'})
    }).catch(error => {
      res.status(500).send(error);
    })
  }).catch(error => {
    res.status(500).send(error);
  })
})

router.get('/enrolledStudents/:class_id', (req, res)=>{

  let classId = req.params.class_id;

  Class.findById(classId).then(clss=> {
    clss.getStudents().then(students => {
      res.status(200).json(students);
    }).catch(error => {
      res.status(500).send(error);
    })
  }).catch(error => {
    res.status(500).send(error);
  })
})

router.get('/availableStudents/:class_id', (req, res)=>{

  let classId = req.params.class_id;

  Student.findAll({
    include : [
      { model : Class, 
        where : {
          id : { 
            ne : classId
          }
        }
      }
    ]
  }).then(studentList => {
    res.status(200).json(studentList);
  }).catch(error => {
    res.status(500).send(error);
  })
})

router.get('/classTests/:class_id', (req, res)=>{

  let classId = req.params.class_id;

  Class.findById(classId).then(clss => {
    clss.getTests().then(tests=>{
      res.status(200).json(tests);
    }).catch(error => {
      res.status(500).send(error);
    })
  }).catch(error => {
    res.status(500).send(error);
  })
})

router.post('/saveClassTest/', (req, res)=>{

  let classId = req.body.class_id;
  let inputTest = req.body.test;

  Test.create(inputTest).then(createdTest => {
    createdTest.addClass([classId]).then(result => {
      res.status(200).json({message : 'Successfully Added Test To Class'})
    }).catch(error => {
      res.status(500).send(error);
    })
  }).catch(error => {
    res.status(500).send(error);
  })
})

module.exports = router;