// Invoke 'strict' JavaScript mode
'use strict';

// Load the test dependencies
var app = require('../../server'),
	request = require('supertest'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article');

// Define global test variables
var user, article;

// Create an 'Articles' controller test suite
describe('Article Controller Unit Tests:', function() {
	// Define a pre-tests function
	beforeEach(function(done) {
		// Create a new 'User' model instance
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		// Save the new 'User' model instance
		user.save(function() {
			article = new Article({
				title: 'Article Title',
				content: 'Article Content',
				user: user
			});

			article.save(function(err) {
				done();
			});
		});
	});

	// Test the 'Article' GET methods
	describe('Testing the GET methods', function() {
		it('Should be able to get the list of articles', function(done) {
			// Create a SuperTest request
			request(app).get('/api/articles/')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					// res.body.should.have.lengthOf(1).and.be.an.Array;  //should.js
					res.body.should.be.an.instanceof(Array).and.have.lengthOf(1);  // should.js
					// res.body.should.be.an.Array.and.have.lengthOf(1);  // this doesn't work in late should.js since Array cannot chain
					res.body[0].should.have.property('title', article.title); // here is should.js
					res.body[0].should.have.property('content', article.content); // here is should.js

					done();
				});
		});

		it('Should be able to get the specific article', function(done) {
			// Create a SuperTest request
			request(app).get('/api/articles/' + article.id)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					// res.body.should.be.an.Object.and.have.property('title', article.title); // here is should.js
					// res.body.should.have.property('content', article.content); // here is should.js

					done();
				});
		});
	});

	// Define a post-tests function
	afterEach(function(done) {
		// Clean the database
		Article.remove(function() {
			User.remove(function() {
				done();
			});
		});
	});
});
