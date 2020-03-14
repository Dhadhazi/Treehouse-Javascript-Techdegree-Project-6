const express = require('express');
const app = express();
const path = require('path');
const { projects } = require('./data.json');


//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Adding static module
app.use('/static', express.static('public'));

//JSON parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Routes
app.get('/', function(req, res, next) {
  res.render('index', {projects});
});

app.get('/about', function(req, res, next) {
  res.render('about');
});

app.get('/project/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const project = projects[id-1];
	res.render('project', {project});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error('This is a user firendly message. Error happens');
  res.status(500);
  res.render('error', {err});
})

app.listen(3000, () => {
	console.log('The application is running on localhost:3000');
});