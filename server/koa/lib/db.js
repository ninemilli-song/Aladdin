/**
 * The database connect object.
 */
const mysql = require('mysql');

let mysqlConnection = null;

mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '19851005',
    database: 'test'
});

mysqlConnection.connect((error) => {
    if (error) {
        console.error('🚗 ---> mysql connection error!\n', error);
    }
});

module.exports = mysqlConnection;
