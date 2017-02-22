angular('app.directives.loginCard', [])
	.directive(
		return {
			scope: true,
			restrict: 'EA', //restricts to html elements and attributes
			replace: 'true', 
			template.url:'loginCard.html'
		},
		controller: console.log($scope)
	}