module.exports = (function(){
	return {
		sandbox: function(req, res){
			res.render('sandbox');
		},

    main: function(req, res){
			res.render('main');
		}
	};

})();
