const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const cors = require('cors');

const conn = require('./db/connection')
const handleSocket = require('./sockets/sockets');
const initDatabase = require('./db/config');
const getInitData = require('./util/utility/loginInit');

/**
 * TO DELETE
 */
const seeder = require('./db/seedData/_seedMethods');

const app = express();
const port = 9000;

const http = require('http').Server(app);
const io = require('socket.io')(http);

//=========================================
//          Middleware
//=========================================
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('client/build'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//=========================================
//          Routes
//=========================================
const router = require('./router/router')(app);

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});


app.get('/test/:userid', (req, res) => {
  console.log('in get for teacher object');
    let userId = req.params.userid;
    getInitData(userId).then(data =>{
      res.status(200).send(data);
    });
});

// app.get('/test', (req, res) => {
//   console.log('in here');
//     seeder();
//     res.status(200).send('hello');
// });

app.post('/test', (req, res) => {
    //console.log(req.body);
    res.status(200).send('hello');
    
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
});

io.on('connection', (socket) => {
  console.log('a user connected');
	handleSocket(socket);
  
});


//=========================================
//          Listen
//=========================================
initDatabase().then(() => {
  http.listen(port, () => {

	  console.log("listening on port " + port);
  });
});



module.exports = app;






