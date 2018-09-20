const db = require('../config/dbconfig.js');

// gets info for one task
function getTodo(taskId){
	return db.one('SELECT id, task, TO_CHAR(date, \'yyyy-mm-dd\') as date, time, location,\
				   completed, description FROM todo_list WHERE id = ${id}', {id: taskId});
}

// gets info for all tasks in list
function getAllTodos(){
	return db.any('SELECT id, task, TO_CHAR(date, \'yyyy-mm-dd\') as date, TO_CHAR(time, \'HH12:MI:SS AM\') as time, \
				   location, completed, description FROM todo_list ORDER BY id');
}

// update info for particular todo
function editTodo(taskId, taskObj){
	return db.any('UPDATE todo_list SET task = ${task}, date = ${date}, time = ${time},\
				   location = ${location}, completed = ${completed}, description = ${desc} WHERE id = ${id}', 
					{
						id: taskId,
				    	task: taskObj.task,
				    	date: taskObj.date,
				    	time: taskObj.time,
				    	location: taskObj.location,
				    	completed: taskObj.completed,
				    	desc: taskObj.description
					});

}

// create a new task
function createTodo(taskObj){
	return db.any('INSERT INTO todo_list (task, date, time, location, completed, username, description) \
	    			VALUES (${task}, ${date}, ${time}, ${location}, ${completed}, ${user}, ${desc})', 
	    			{
				    	task: taskObj.task,
				    	date: taskObj.date,
				    	time: taskObj.time,
				    	location: taskObj.location,
				    	completed: false,
				    	user: "Wendy",
				    	desc: taskObj.description
					});
}

// mark task as complete
function completeTodo(taskId){
	return db.any('UPDATE todo_list SET completed = true WHERE id = ${id}', {id: taskId});
}

// mark task as in-progress
function resumeTodo(taskId){
	return db.any('UPDATE todo_list SET completed = false WHERE id = ${id}', {id: taskId});
}

// remove a task from list
function deleteTodo(taskId){
	return db.any('DELETE FROM todo_list WHERE id = ${id}', {id: taskId});
}

// exports
module.exports = {
	getTodo:getTodo, 
	getAllTodos:getAllTodos, 
	createTodo:createTodo,
	editTodo:editTodo,
	completeTodo:completeTodo, 
	resumeTodo:resumeTodo,
	deleteTodo:deleteTodo
};