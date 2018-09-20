// imported modules
const uController = require('./controller/userController.js');
const tController = require('./controller/todoController.js');
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

/*
// basic auth
const basicAuth = require('express-basic-auth')
app.use(basicAuth({
	challenge: true,
    users: { 'user': 'secret' },
    realm: "todolist",
    unauthorizedResponse: getUnauthorizedResponse
}))
 
function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}
*/

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    secret: 'mysupersecretkey',
    resave: false,
    saveUninitialized: false,
}));


// view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body parser middleware
//app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// static files(css, js)
app.use(express.static(__dirname + '/public'));



// routes **
app.get('/', uController.redirectToLogin);   // home

app.get('/login', uController.loginGet);   // login
app.post('/login', uController.loginPost);

app.get('/signup', uController.signupGet);	// sign-up
app.post('/signup', uController.signupPost);	

app.get('/logout', uController.logout);		// logout

app.get('/home', uController.checkSession, tController.getTodolist);   // home

app.post('/create', uController.checkSession, tController.addTask);    // create task

app.get('/edit/:id', uController.checkSession, tController.editTaskGet);  // edit task (view)
app.post('/edit/:id', uController.checkSession, tController.editTaskPost); // edit task (send)

app.get('/complete', uController.checkSession, tController.completeTask);  // complete task

app.get('/resume', uController.checkSession, tController.resumeTask);  // un-complete task

app.post('/delete', uController.checkSession, tController.deleteTask);  // delete task



// listen
app.listen(3000, () => console.log('Server running at http://localhost:3000/'));
