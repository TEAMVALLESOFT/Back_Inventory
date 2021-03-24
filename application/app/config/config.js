const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'host_name',
    user : 'name_user',
    password : 'password',
    Port : 3306,
    database : 'name_database'
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Base de datos Conectada');
    }
});

module.exports = mysqlConnection;