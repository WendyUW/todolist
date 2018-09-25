const todolist = require('../model/todolist.js');
const path = require('path');


function getTodolist(req, res){
    console.log('* Get todos!')

    // render page with todo data using returned promise
    todolist.getAllTodos().then(function(data){
        res.render('index', {todos: data, css: ['home.css']});
    }).catch(function(error){
        console.log(error.message);
    });
}

function addTask(req, res){
    console.log('* Create task!');
    console.log(req.body);
    
    todolist.createTodo(req.body).then(function(data){
        res.redirect('/home');  
    }).catch(function(error){
        console.log(error.message);
    });
}

function editTaskGet(req, res){
    console.log('*Edit task get!');
    console.log(req.params);
    
    // render task view page with selected task object info
    todolist.getTodo(parseInt(req.params.id)).then(function(data){
        res.render('task', {todo: data, css: ['edit.css']});
    }).catch(function(error){
        console.log(error.message);
    });
}

function editTaskPost(req, res){
    console.log('*Edit task post!');
    console.log(req.body);
    
    todolist.editTodo(parseInt(req.params.id), req.body).then(function(data){
        res.redirect('/home');
    }).catch(function(error){
        console.log(error.message);
    });
}

function completeTask(req, res){
    console.log('*Complete task!');
    console.log(req.query);

    todolist.completeTodo(parseInt(req.query.id)).then(function(data){
        res.set('Content-Type', 'text/plain');
        res.end('completed ' + req.query.id);
    }).catch(function(error){
        console.log(error.message);
    });
}

function resumeTask(req, res){
    console.log('*Resume task!');
    console.log(req.query);

    todolist.resumeTodo(parseInt(req.query.id)).then(function(data){
        res.set('Content-Type', 'text/plain');
        res.end('resumed ' + req.query.id);
    }).catch(function(error){
        console.log(error.message);
    });
}

function deleteTask(req, res){
    console.log('*Delete task!');
    console.log(req.body);

    todolist.deleteTodo(parseInt(req.body.id)).then(function(data){
        res.set('Content-Type', 'text/plain');
        res.end('Removed ' + req.body.id);
    }).catch(function(error){
        console.log(error.message);
    });
}


// exports
module.exports.getTodolist = getTodolist;
module.exports.addTask = addTask; 
module.exports.editTaskGet = editTaskGet;  
module.exports.editTaskPost = editTaskPost;
module.exports.completeTask = completeTask;
module.exports.resumeTask = resumeTask;
module.exports.deleteTask = deleteTask;
