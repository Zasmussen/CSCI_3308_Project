var express = require('express')
var mysql = require('mysql')
var crypto = require('crypto'),
		format = require('biguint-format');
var rn = require('random-number');
var abs = require('math-abs');
var connection = mysql.createConnection({
	host     : 'localhost',
 	user     : 'root',
	password : 'hockey1997',
	database : 'Cost_Quest'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});
var app = express()

app.get('/',function(req,res){
	res.render('login.ejs', {title: 'CostQuest Login Page'} );
});

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
global.currentUser;
app.post('/login', function(req,res) {

connection.query('SELECT * FROM QuestUsers WHERE UserName = ?',req.body.username, function (error, results, fields) {
  if (error) {
    res.send("Error ocurred")
  }else{
    if(results.length >0){
      if(results[0].Password == req.body.password){
				global.currentUser = req.body.username;
        connection.query('SELECT Score FROM QuestScores INNER JOIN QuestUsers ON QuestUsers.UserID = QuestScores.UserID WHERE QuestUsers.UserName = ?',req.body.username,
		function (err, result) {
			if (err)
				throw err
			var score = result[0].Score
			res.render('success',{message: 'Welcome ' + req.body.username + '! Your current score is ' + score, username: req.body.username})
		});
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

app.get('/play', function(req, res) {
	var options = {
		min: 1
	, max: 51
	, integer: true
	}
	var id = rn(options);
	connection.query('SELECT * FROM QuestProducts WHERE productID = ?',id,function(err,result)
	{

		res.render('play',{username: req.body.username,
											id: id,
											name: result[0].ProductName,
											desc: result[0].Description,
											url: result[0].ImageURL,
											price: result[0].DollarPrice})
	});


})

app.post('/play', function(req,res) {
 var item = {
	 id:	 req.sanitize('id').escape().trim(),
	 name: req.sanitize('name').escape().trim(),
	 description: req.sanitize('desc').escape().trim(),
	 price: req.sanitize('price').escape().trim(),
	 gPrice: req.sanitize('guessedPrice').escape().trim(),
	 username: req.sanitize('username').escape().trim()
 }
 item.price = item.price.replace('$','');
 var diff = item.price - item.gPrice;
	diff = abs(diff);
 connection.query('SELECT Score FROM QuestScores INNER JOIN QuestUsers ON QuestUsers.UserID = QuestScores.UserID WHERE QuestUsers.UserName = ?',global.currentUser,
	function (err, result) {
		if(diff < result[0].Score)
		{
			connection.query('UPDATE QuestScores SET Score = ' + diff + ' WHERE userID = (SELECT userID from QuestUsers WHERE UserName = "' + global.currentUser + '")');
		}
	})
	var options = {
		min: 1
	, max: 51
	, integer: true
	}
	var id = rn(options);
	connection.query('SELECT * FROM QuestProducts WHERE productID = ?',id,function(err,result)
	{
		res.render('play',{username: req.body.username,
											id: id,
											name: result[0].ProductName,
											desc: result[0].Description,
											url: result[0].ImageURL,
											price: result[0].DollarPrice})
	});
})


module.exports = app;
