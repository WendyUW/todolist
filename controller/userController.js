const user = require('../model/user.js');
const bcrypt = require('bcrypt');


// function to check for loggedin users
function checkSession(req, res, next){
    if (req.session.user) {
        next();
    } else {
        res.status(401);
        res.set('Content-Type', 'text/plain');
        res.end('Sorry, please log in to view this page.');
    }    
}

function redirectToLogin(req, res){
    res.redirect('/login');
}

function loginGet(req, res){
    res.render('login', {css: ['login_signup.css']});
}

function loginPost(req, res){
    // check user credentials
    user.lookupUser(req.body.id)
        .then(function(data){
            var isMatch = false;

            // check password
            if (data){
                isMatch = bcrypt.compareSync(req.body.password, data.password);
            }

            if (isMatch){
                req.session.user = {id: req.body.id, password: req.body.password};
                res.redirect('/home');  
            }
            else{
                res.render('login', {message: "Invalid credentials"});
            }
        })
        .catch(function(error){
            console.log(error.message);
            res.render('login', {message: "Please try again"});
        });
}

function signupGet(req, res){
    res.render('signup', {css: ['login_signup.css']});
}

function signupPost(req, res){
    // add new user/session, redirect to home
    user.createUser(req.body.id, req.body.password)
        .then(function(data){
            req.session.user = {id: req.body.id, password: req.body.password};
            res.redirect('/home');       
        })
        .catch(function(error){
            console.log(error.message);
            res.render('signup', {message: "Please try again with different credentials."})
        });
}

function logout(req, res){
    req.session.destroy();
    res.redirect('/login');
}


// exports
module.exports.checkSession = checkSession;
module.exports.redirectToLogin = redirectToLogin;
module.exports.loginGet = loginGet;
module.exports.loginPost = loginPost;
module.exports.signupGet = signupGet;
module.exports.signupPost = signupPost;
module.exports.logout = logout;

