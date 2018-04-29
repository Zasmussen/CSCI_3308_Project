var express = require('express')
var mysql = require('mysql')
var crypto = require('crypto'),
		format = require('biguint-format');
var rn = require('random-number');
var abs = require('math-abs');
var config = require('../config')
var connection = mysql.createConnection({
	host     : config.database.host,
 	user     : config.database.user,
	password : config.database.password,
	database : config.database.db
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
	res.render('login.ejs', {title: 'CostQuest Login Page',message:''} );
});

app.get('/login', function(req, res) {
 res.render('login', {title: 'CostQuest Login Page',message:''})
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
        connection.query('SELECT Score FROM QuestScores INNER JOIN QuestUsers ON QuestUsers.UserID = QuestScores.UserID WHERE QuestUsers.UserName = ?',req.body.username,
		function (err, result) {
			if (err)
				throw err
			var score = result[0].Score
			res.render('success',{message: 'Welcome ' + req.body.username + '! Your current accuracy is ' + score +'%', username: req.body.username, score:score})
		});
      	}
      else{
				res.render('login',{message: 'Username and password do not match'});
        //res.send("Username and password do not match");
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
	var username = req.sanitize('username').escape().trim();
	var score = req.sanitize('score').escape().trim();
	var id = rn(options);
	connection.query('SELECT * FROM QuestProducts WHERE productID = ?',id,function(err,result)
	{

		res.render('play',{username: username,
											score: score,
											id: id,
											name: result[0].ProductName,
											desc: result[0].Description,
											url: result[0].ImageURL,
											price: result[0].DollarPrice,
											message:''})
	});


})

app.post('/play', function(req,res) {
 var item = {
	 id:	 req.sanitize('id').escape().trim(),
	 name: req.sanitize('name').escape().trim(),
	 description: req.sanitize('desc').escape().trim(),
	 price: req.sanitize('price').escape().trim(),
	 gPrice: req.sanitize('guessedPrice').escape().trim(),
	 username: req.sanitize('username').escape().trim(),
	 score: req.sanitize('score').escape().trim()
 }
 connection.query('UPDATE QuestScores SET games = games + 1 WHERE userID = (SELECT userID from QuestUsers WHERE UserName = "' + item.username + '")');
 item.price = item.price.replace('$','');
 var guess = item.price - item.gPrice;
 if(guess==0)
 {
	 guess = 100;
 }
 else
 {
 	guess = 100-((abs(guess)/item.price)*100);
 }
 if(guess < 0)
 {
 	guess = 0;
 }
 connection.query('SELECT Score,games FROM QuestScores INNER JOIN QuestUsers ON QuestUsers.UserID = QuestScores.UserID WHERE QuestUsers.UserName = ?',item.username,
	function (err, result)
	{
		if(result[0].games==1)
		{
			var score = guess;
			item.score = score;
		}
		else if(result[0].games>1)
		{
			var score = ((result[0].Score*(result[0].games-1))+guess)/result[0].games;
			item.score = score;
		}
		connection.query('UPDATE QuestScores SET Score = ' + score + ' WHERE userID = (SELECT userID from QuestUsers WHERE UserName = "' + item.username + '")');
	})
	var options = {
		min: 1
	, max: 51
	, integer: true
	}
	var id = rn(options);
	connection.query('SELECT * FROM QuestProducts WHERE productID = ?',id,function(err,result)
	{	if(item.gPrice > item.price)
		{
		res.render('play',{username: item.username,
											score: item.score,
											id: id,
											name: result[0].ProductName,
											desc: result[0].Description,
											url: result[0].ImageURL,
											price: result[0].DollarPrice,
											message: 'Too High!'})
			}
			else if(item.gPrice < item.price)
			{
				res.render('play',{username: item.username,
													score: item.score,
													id: id,
													name: result[0].ProductName,
													desc: result[0].Description,
													url: result[0].ImageURL,
													price: result[0].DollarPrice,
													message: 'Too Low!'})
			}
			else
			{
				res.render('play',{username: item.username,
													score: item.score,
													id: id,
													name: result[0].ProductName,
													desc: result[0].Description,
													url: result[0].ImageURL,
													price: result[0].DollarPrice,
													message: 'Perfect!'})
			}
	});
})


app.get('/signup', function(req,res)
{
	res.render('signup',{message: ''});
})

app.post('/signup', function(req,res)
{


	connection.query('SELECT UserName from QuestUsers WHERE UserName = "' + req.body.username + '"',function(err,result)
	{
		if(result[0])
		{
			var id1=1;
			connection.query('SELECT MAX(userID) AS id from QuestUsers',
				function(err,result)
				{
					id1 = result[0].userID;
					console.log(result[0].id);
				});
			console.log(id1);
			res.render('signup',{message: 'Username Taken!'})
		}
		else if(req.body.password != req.body.password2)
		{
			res.render('signup',{message: 'Passwords Do Not Match!'})
		}
		else
		{
			connection.query('SELECT MAX(userID) AS id from QuestUsers',
				function(err,result)
				{
					var maxID;
					maxID =result[0].id+1;
					connection.query('INSERT INTO QuestUsers (UserName,Password,Email,userID) VALUES("' + req.body.username + '","'+req.body.password+'","",'+maxID+')');
					connection.query('INSERT INTO QuestScores (Score,games,userID) VALUES(0,0,'+maxID+')');
				});
			res.render('success',{message: 'Welcome ' + req.body.username + '! Your current accuracy is ' + 0 +'%', username: req.body.username, score:0})
		}
	});
})


module.exports = app;
