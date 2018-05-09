# CSCI 3308 Team Project
Repository for CSCI 3308 Software Development Methods and Tools semester project. Group members: Zachary Asmussen, Rebekah Haysley, Haotian Zheng, Theodore Margoles, Jorge Pulido Lopez, and Binpeng Wu.

# Project Name = Cost Quest
This project is a web game, hosted on heroku, that allows users to sign up for an account, then play a fun game of guessing prices of everyday electronics, gadgets, groceries and other items! Enjoy!

# GitHub structure: 
All Milestones are in the "master" branch.
The "README.md" is in the "master" branch and the "style" branch.
The final submission code is in the "style" branch.
The test cases are in the "test" branch.

# To play the game via heroku:
1. Click the link below described as heroku deployment link
2. Sign in with account with username=TA and password=ta1 (premade account with 0% accuracy, 0 guesses in the database)
3. Play the game, listen to or mute music, watch accuracy improve / get worse
4. Exit out of the game
5. Re-open heroku link, login, see accuracy you had built up

# Heroku deployment: 
Heroku deployment link: https://secure-reaches-29983.herokuapp.com/

# Troubleshooting heroku: 
Because Heroku has limited dynos, sometimes the app crashes and needs you to manually restart it. This is done by: 
1. Go to https://id.heroku.com/login
2. Login using the following account info:
    Email = thma4828@colorado.edu
    Password = tsmarg$1998
3. Click on “secure-reaches-29983”
4. Hit “Open app” button in top right hand corner
5. If you get an “Application Error”, got back to the “secure-reaches-29983” page, then:
6. Hit the “More” button in the top right hand corner
7. Click “Restart all dynos” and confirm “Restart all dynos”
8. Wait a few seconds
9. Click “Open app”

# To play the game on local machine:
1. Clone the style branch from our github repo: https://github.com/Zasmussen/Cost_Quest.git
2. Connect to SQL and add database called Cost_Quest, and make sure that you are using this database
3. Enter the following commands:
    source QuestProducts.sql
    source QuestUsers.sql
    source QuestScores.sql
4. Update config file to connect to local host and local MySQL connection (and make sure your password is correct)
5. From the command line run: node app.js
6. Go to your preferred browser and connect to local host




