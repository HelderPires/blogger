var app = angular.module('blogger', ['ui.router', 'postController', 'authController'])

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('/', {
			url:"",
			templateUrl:"/views/gate.html"
		})
		.state('login',{
			url:"/login",
			templateUrl:"/views/login.html",
			controller: ['authControler']
		})
		.state('signup',{
			url:"/signup",
			templateUrl:"/views/signup.html",
			controller: ['authControler']
		})
		.state('home', { //todo change to blog
			url:"/home/:user.id",
			templateUrl: "/views/home.html",
		})
		.state('home.profile', {
			views: {
				'posts@' : {
					templateUrl: '/views/partial-blog.html',
					controller:['postControler']
				},
				'accounts@' : {
					templateUrl: '/views/partial-accounts.html',
					controller: ['authControler']
				}
			}
		})
});



















/*
//cofigure view routes

app.config(function(
		$routerProvider(function($routeProvider) {
			$routeProvider
			//TO home
			.when('/', {
				templateUrl: '/views/home.html',
				controller: 'authController'
			})
			//TO login
			.when('/login', {
				templateUrl: '/views/login.html',
				controller: 'authController'
			})
			//TO signup
			.when('/signup', {
				templateUrl: '/views/signup.html',
				"controller: 'authController'
			})
			//TO profile
			.when('/profile', {
				templateUrl: '/views/profile.html',
				controller: 'authController'
			});			
		});
		

))
*/