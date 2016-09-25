var Notes = require('../controllers/notes.js');
var Views = require('../controllers/views.js');
var multer   = require('multer');
var upload = multer({dest: 'client/imgs/'});


module.exports = function(app){

	// View routing

  	app.get('/', Views.main);
	// app.get('/sandbox', Views.sandbox);
	
	// Note routing
	app.post('/notes/add', upload.single('avatar'), function(req, res){
		Notes.add(req, res);
	});
	app.post('/find_by_location', function(req, res){
		Notes.find_by_location(req, res);
	});
	app.post('/find_by_name', function(req, res){
		Notes.find_by_name(req, res);
	});
	app.get('/note/:id', function(req, res){
		Notes.get_by_id(req, res);
	});
	app.post('/reply/add', function(req, res){
		Notes.add_reply(req, res);
	});
	app.post('/image/add', upload.single('avatar'), function(req, res){
		Notes.add_image(req, res);
	});

	// Sandbox 
	app.get('/sandbox', function(req, res){
		Notes.all(req, res);
	});


};
