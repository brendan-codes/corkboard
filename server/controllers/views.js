module.exports = (function(){
	return {

    	main: function(req, res){
			res.render('main');
		},

		sandbox: function(req, res){
	      res.render('sandbox');
	    },
	};

})();
