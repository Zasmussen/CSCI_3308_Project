var config = {
 database: {
 host: 'us-cdbr-iron-east-05.cleardb.net', // database host
 user: 'b1ba0edd9924f7', // your database username
 password: 'd6a655f3', // your database password
 port: 5432, // port for heroku database
 db: 'heroku_bec06c68575ec5b' // your database name
 },
 server: {
 host: '198.105.244.23',
 port: 5432
 }
}
module.exports = config //Expose the current config as a module
