var express = require('express')
var mysql = require('mysql')
var connection = mysql.createConnection({
	host     : 'localhost',
 	user     : 'root',
	password : '323013Rdh!',
	database : 'CostQuest'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});
var app = express()
app.get('/', function(req, res) {
 res.render('index', {title: 'CostQuest Login Page'})
 // Title is the custom title which you pass to be added in the header layout
})
/**
 * We assign app object to module.exports
 *
 * module.exports exposes the app object as a module
 *
 * module.exports should be used to return the object
 * when this file is required in another module like app.js
 */

app.get('/login', function(req,res) {
	res.send('Welcome ' + req.query['username'] + '! Your current score is XXX.');
// want to query QuestUsers database to make sure username and password exist.
// If they do, want to res.send('Welcome ' req.query['username']) and say something about current score from QuestScore mysql table
// If they don't exist, wnat to do res.send('invalid login creditials. try again') and return to login page


})



module.exports = app;
