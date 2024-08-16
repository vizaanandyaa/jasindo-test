const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xxywz120901',
    database: 'tes_crud'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = db