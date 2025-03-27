const mysql = require('mysql2');
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Passord123!', // skriv passordet ditt her hvis du har
  database: 'bibliotek'
});
 
connection.connect((err) => {
  if (err) {
    console.error('Feil ved tilkobling til databasen:', err);
  } else {
    console.log('Tilkoblet til MySQL-databasen!');
  }
});
 
module.exports = connection;