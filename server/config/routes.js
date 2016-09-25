var Notes = require('../controllers/notes.js');
var Views = require('../controllers/views.js');


module.exports = function(app){

	// View routing
  app.get('/', Views.main);
	app.get('/sandbox', Views.sandbox);

	// Note routing
	app.post('/notes/add', function(req, res){
		Notes.add(req, res);
	});
	app.post('/find_by_location', function(req, res){
		Notes.find_by_location(req, res);
	});





};
