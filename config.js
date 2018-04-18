var config = {
 database: {
 host: 'us-cdbr-iron-east-05.cleardb.net', // database host
 user: 'b1ba0edd9924f7', // your database username
 password: 'd6a655f3', // your database password
 port: process.env.PORT, // port for heroku database
 db: 'heroku_bec06c68575ec5b' // your database name
 },
 server: {
 host: '198.105.244.23',
 port: process.env.PORT
 }
}
module.exports = config //Expose the current config as a module
