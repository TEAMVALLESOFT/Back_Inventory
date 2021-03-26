const mysql = require('mysql');

//configurar la conexión de acuerdo a las credenciales
const mysqlConnection = mysql.createConnection({
    host: 'remotemysql.com',
    user : 'SicDMSiMjC',
    password : 'QTnWiJvXZ7',
    Port : 3306,
    database : 'SicDMSiMjC'
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