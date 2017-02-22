var Post = require('./models/post');
var User = require('./models/user');

// expose API routes
module.exports = function(app, passport){
	//==============================================================================
	//VIEWS ========================================================================
	//==============================================================================
	
	// HOME ====================================
	app.get('/', function(req, res) {res.sendFile('index.html',  {root: __dirname + '/public/views/'});});
	
	//==========================================================================
	// API ROUTES ==============================================================
	//==========================================================================
	
	//GET ALL ==================================================================
	app.get('/api/posts', function(req, res) {
	    Post.find(function(err, posts) {	
	        if (err) res.send(err);	
	        res.json(posts);
	        });
	});
	//CREATE POST ==============================================================
	app.post('/api/posts/create', function(req, res) {
		Post.create({
			title: req.body.title,
			body : req.body.body,
	        publishDate: req.body.publishDate
	    }, function(err, post) { 
	    	if (err) res.send(err);
	    	//refresh
	    	Post.find(function(err, posts) {
	            if (err) res.send(err)
	            res.json(posts);
	        });
	    });
	});
	app.post('/api/posts/update/:post_id', function(req, res) {
		Post.findOneAndUpdate({_id : req.params.post_id}, {
			title: req.body.title,
			body : req.body.body,
	        publishDate: req.body.publishDate
		},{}, function(err, post) {
			if (err) res.send(err);
	        Post.find(function(err, posts) {
	            if (err) res.send(err)
	            res.json(posts);
	        });
		});
	});	
	//DELETE POST ================================================================
	app.delete('/api/posts/delete/:post_id', function(req, res) {
	    Post.remove({_id : req.params.post_id
	    }, function(err, post) {
	        if (err) res.send(err);
	        Post.find(function(err, posts) {//return all the posts
	            if (err) res.send(err)
	            res.json(posts);
	        });
	    });
	});
	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.sendFile('profile.html',  {root: __dirname + '/public/views/'});
		/* res.render('profile.html', {
			user : req.user
		});*/
	});
	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	// =============================================================================
	// AUTHENTICATE (FIRST LOGIN) ==================================================
	// =============================================================================
	
	// LOCAL =======================================================================
	
	// LOGIN ===============================
	app.get('/auth/login', function(req, res) {
		res.sendFile('login.html',  {root: __dirname + '/public/views/'});
		{ message: req.flash('loginMessage') }
	});
	app.post('/auth/login', passport.authenticate('local-login', {
		successRedirect : '/views/profile',
		failureRedirect : '/views/login',
		failureFlash : true
	}));

	// SIGNUP =================================
	app.get('/auth/signup', function(req, res) {
		res.sendFile('signup.html',  {root: __dirname + '/public/views/'});
	});
	app.post('/auth/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	// FACEBOOK ================================
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	// TWITTER =================================
	app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));
	// GOOGLE =================================
	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
	app.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));	
	// =============================================================================
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
	// =============================================================================
	// LOCAL ====================================
		app.get('/connect/local', function(req, res) {
			res.sendFile('connect-local.html',  {root: __dirname + '/public/views/'});
			//res.render('connect-local.html', { message: req.flash('loginMessage')});
			});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));
	// FACEBOOK =================================
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));
	// TWITTER =================================
		app.get('/connect/twitter', passport.authorize('twitter', { scope : 'include_email' }));
		app.get('/connect/twitter/callback',
			passport.authorize('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));
	// GOOGLE =================================
		app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
		app.get('/connect/google/callback',
			passport.authorize('google', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));
	
	// =============================================================================
	// UNLINK ACCOUNTS =============================================================
	// =============================================================================
	// used to unlink accounts. for social accounts, just remove the token
	// for local account, remove email and password
	// user account will stay active in case they want to reconnect in the future

	// LOCAL ===================================
	app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});
	// FACEBOOK ================================
	app.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});
	// TWITTER =================================
	app.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});
	// GOOGLE ===================================
	app.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
};