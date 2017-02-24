// routes ======================================================================
var Post = require('./models/post');
// expose API routes
module.exports = function(app){
	// API ROUTES
	//GET ALL
	app.get('/api/posts', function(req, res) {
	    Post.find(function(err, posts) {	
	        if (err) res.send(err);	
	        res.json(posts);
	        });
	});
	//CREATE POST
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
	// delete a post
	app.delete('/api/posts/delete/:post_id', function(req, res) {
	    Post.remove({_id : req.params.post_id
	    }, function(err, post) {
	        if (err) res.send(err);
	        // get and return all the posts after you create another
	        Post.find(function(err, posts) {
	            if (err) res.send(err)
	            res.json(posts);
	        });
	    });
	});
	//VIEWS
	app.get('', function(req, res) {res.sendFile('./public/index.html', {root: __dirname});});
};
