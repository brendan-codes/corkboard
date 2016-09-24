var express    = require('express'),
	path       = require('path'),
	bodyParser = require('body-parser'),
	app        = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './client/views'));
app.use(express.static(path.join(__dirname, "./client")));
app.use(bodyParser.json());

require('./config/routes.js')(app);

app.listen(8001, function(){
	console.log('Corkboard on port 8001');
});
