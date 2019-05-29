const express = require("express");
const bodyParser = require('body-parser');
const actions = require('./server/courses.js');
const getUserInfo = require('./server/validate.js');
const fs = require('fs');
const url = require('url');
const multer = require('multer');
const picsPath = './public/pics/';
const upload = multer({
    dest: picsPath
});
let app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/users', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    if (getUserInfo(body)) {
        res.send(true);
    }
    else {
        res.send(false);
    }
})
app.post('/api/student/active', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    res.send(actions.getActiveCourses(body.username));

})

app.post('/api/student/professorActive', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    res.send(actions.getActiveCourses(body.username, true));

})

app.post('/api/courses/createSchedule', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    actions.createWithOfferings(body.courses, body.username)
    res.send(true);

})

app.post('/api/courses/createProfessorSchedule', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    actions.createWithOfferings(body.courses, body.username, true)
    res.send(true);

})

app.post('/api/courses/submit', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    actions.submitSchedule(body.username)
    res.send(true);

})

app.post('/api/courses/professorSubmit', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    actions.submitSchedule(body.username, true)
    res.send(true);

})

app.post('/api/courses/delete', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    actions.deleteSchedule(body.username)
    res.send(true);

})

app.post('/api/courses/professorDelete', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    actions.deleteSchedule(body.username, true)
    res.send(true);

})

app.post('/api/courses/update', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    actions.updateWithNewSelections(body.courses, body.username)
    res.send(true);

})

app.post('/api/courses/professorUpdate', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    actions.updateWithNewSelections(body.courses, body.username, true)
    res.send(true);

})

app.post('/api/students/mark', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    actions.markStudent(body.mark, body.student, true)
    res.send(true);

})
app.post('/api/courses/getUsers', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    res.send(actions.getCourseStudents(body.course));

})


app.post('/api/registration/change', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    res.send(actions.changeOpen(body.courses));

})



app.get('/api/courses/all', (req, res) => {
    res.statusCode = 200;
    res.send(actions.getCourseOfferings());

})

app.get('/api/registration/all', (req, res) => {
    res.statusCode = 200;
    res.send(actions.getCourseOfferings(true));

})


app.listen('3000', () => {
    console.log('Server is running');
});