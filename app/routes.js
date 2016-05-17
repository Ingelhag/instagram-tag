'use strict';

var api = require('instagram-node').instagram();
api.use({ client_id: '6d90c568e3474ae1b00e14703ff6df9c', client_secret: '3bdd25fff7e345a6bd5f7e3ef2d31ed7' });

module.exports = function(app) {

	var redirect_uri = 'http://localhost:8000/auth/instagram/callback';
 
	exports.authorize_user = function(req, res) {
	  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['public_content','comments', 'relationships'], state: 'a state' }));
	};
	 
	exports.handleauth = function(req, res) {
	  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
	    if (err) {
	      console.log(err.body);
	      res.redirect('/');
	    } else {
	      console.log('Yay! Access token is ' + result.access_token);
	      api.use({ access_token: result.access_token });
	      res.redirect('/#/access');
	    }
	  });
	};
	 
	// This is where you would initially send users to authorize 
	app.get('/auth/instagram', exports.authorize_user);
	// This is your redirect URI 
	app.get('/auth/instagram/callback', exports.handleauth);

	app.get('/api/tag', function(req, res){

		api.user_self_media_recent(function(err, medias, pagination, remaining, limit) {
			if(medias == undefined) return res.json('Fail');
			return res.json(medias);
		});
	});
};