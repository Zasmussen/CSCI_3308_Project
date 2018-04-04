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
app.get('/login', function(req, res) {
 res.render('login', {title: 'CostQuest Login Page'})
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

app.post('/login', function(req,res) {

connection.query('SELECT * FROM QuestUsers WHERE UserName = ?',req.body.username, function (error, results, fields) {
  if (error) {
    res.send("Error ocurred")
  }else{
    if(results.length >0){
      if(results[0].Password == req.body.password){
        res.send('Welcome ' + req.body.username + '! Your current score is XXX.');
      }
      else{
        res.send("Username and password do not match");
      }
    }
    else{
      res.send("Username does not exits");
    }
  }
  });

})



module.exports = app;
