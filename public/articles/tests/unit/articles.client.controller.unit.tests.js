// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'articles' module unit test suite
describe('Testing Articles Controller', function() {
	// Define global variables
	var _scope, ArticlesController;

	// Define a pre-tests function
	beforeEach(function() {
		// Load the 'mean' module
		module('mean');

		// Add a new Jasmine matcher
		jasmine.addMatchers({
			toEqualData: function(util, customEqualityTesters) {
				return {
					compare: function(actual, expected) {
						return {
							pass: angular.equals(actual, expected)
						};
					}
				};
			}
		});

		// Use the 'inject' method to inject services
		inject(function($rootScope, $controller) {
			// Create a mock scope object
			_scope = $rootScope.$new();

			// Create a new mock controller
			ArticlesController = $controller('ArticlesController', {
				$scope: _scope
			});
		});
	});

	// Test the 'find' method
	it('Should have a find method that uses $resource to retrieve a list of articles', inject(function(Articles) {
		// Use the 'inject' method to inject services
		inject(function($httpBackend) {
			// Create a sample article
			var sampleArticle = new Articles({
				title: 'An Article about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample articles list
			var sampleArticles = [sampleArticle];

			// Define a request assertion
			$httpBackend.expectGET('api/articles').respond(sampleArticles);

			// Call the controller's 'find' method
			_scope.find();

			// Flush the mock HTTP results
			$httpBackend.flush();

			// Test the results
			expect(_scope.articles).toEqualData(sampleArticles);
		});
	}));

	// Test the 'findOne' method
	it('Should have a findOne method that uses $resource to retreive a single of article', inject(function(Articles) {
		// Use the 'inject' method to inject services
		inject(function($httpBackend, $routeParams) {
			// Create a sample article
			var sampleArticle = new Articles({
				title: 'An Article about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the 'articleId' route parameter
			$routeParams.articleId = 'abcdef123456789012345678';

			// Define a request assertion
			$httpBackend.expectGET(/api\/articles\/([0-9a-fA-F]{24})$/).respond(sampleArticle);

			// Call the controller's 'findOne' method
			_scope.findOne();

			// Flush the mock HTTP results
			$httpBackend.flush();

			// Test the results
			expect(_scope.article).toEqualData(sampleArticle);
		});
	}));
});

/*First, you required your module dependencies, and de ned your global variables. You started your test using a describe() method, which informs the test tool this test is going to examine ArticlesController. Inside the describe block, we began by creating a new controller and scope objects using the beforeEach() method.

Inside the beforeEach() method, we created a new custom Jasmine Matcher,
called toEqualData. This matcher will compare a regular object and a $resource wrapped object using the angular.equal() method. We added this matcher because $resource adds quite a few properties to our objects, so the basic comparison matcher will not work.

You then created the first specication that is going to test the controller's find() method. The trick here is to use the $httpBackend.expectGET() method, which sets a new backend request assertion. This means that the test expects an HTTP request that ful lls this assertion, and will respond with a certain response. You then used the controller's find() method, which will create a pending HTTP request. The cycle ends when you call the $httpBackend.flush() method, which will simulate the server's response. You concluded the test by testing your model's values.

The second specication is almost identical to the  rst one but will test the controller's findOne() method.On top of the $httpBackend service,it also uses the $routeParams service to set the articleId route parameter. Now that you have your first unit test, let's see how you can execute it using Karma's command-line utility.*/
