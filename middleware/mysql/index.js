


 const db = require('mysql-promise')();

db.configure({
    "host": "localhost",
    "user": "root",
    "password": "aa123456!A",
    "database": "test"
});

module.exports ={
    db
}