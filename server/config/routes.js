var Notes = require('/../controller/notes.js')

module.exports = function(app){


	// Note routing
	app.get('/', Notes.index);
	app.post('/find_by_location', Notes.find_by_location);





}