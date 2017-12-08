/**
 * The database connect object.
 */
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '19851005',
    database: 'test'
});

mysqlConnection.connect();

module.exports = mysqlConnection;
