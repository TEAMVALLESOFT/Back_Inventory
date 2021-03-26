const mysql = require('mysql');

//configurar la conexión de acuerdo a las credenciales
const mysqlConnection = mysql.createConnection({
    host: 'host_name',
    user : 'user_name',
    password : 'password',
    Port : 3306,
    database : 'database_name'
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