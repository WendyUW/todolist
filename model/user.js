const db = require('../config/dbconfig.js');
const bcrypt = require('bcrypt');

// create a new user account
function createUser(id, password){
	// generate salt and hash the password
	const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
	return db.any('INSERT INTO users VALUES (${userid}, ${pwd})', {userid: id, pwd: password});
}

// look up a user
function lookupUser(id){
	return db.one('SELECT password FROM users WHERE id = ${userid}', {userid: id});
}

// exports
module.exports = {
	createUser: createUser,
	lookupUser: lookupUser
};