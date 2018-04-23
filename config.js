var config = {
 database: {
 host: 'us-cdbr-iron-east-05.cleardb.net', // database host
 user: 'b4026dfdc24e88', // your database username
 password: 'c076f20c', // your database password
 port: process.env.PORT, // MySQL port for heroku!
 db: 'heroku_61e5d3617623f44' // your database name
 },
 server: {
 host: 'us-cdbr-iron-east-05.cleardb.net',
 port: process.env.PORT
 }
}
module.exports = config //Expose the current config as a module
