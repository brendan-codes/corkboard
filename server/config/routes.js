var Notes = require('../controllers/notes.js');
var Views = require('../controllers/views.js');


module.exports = function(app){

	// View routing
	app.get('/', Views.main);

	// Note routing
	app.post('/find_by_location', Notes.find_by_location);





}