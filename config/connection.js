//deps for mysql
let mysql= require('mysql');
let connection;
//create mysql connection
if(process.env.JAWSDB_URL){
    connection= mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection= mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'khoimj15',
        database: 'burgers_db',
    })
}

//connect to database
connection.connect();

module.exports= connection;
