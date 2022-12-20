var mysql = require('mysql');
var connection = mysql.createConnection({
	multipleStatements: true,
	host:'localhost',
	port: 3308,
	user:'root',
	password:'',
	database:'atencion_medica'
});

connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;
