angular.module('authController', [])
.controller('authController', ['$scope', '$http', function($scope, $http) {
    //initialize formData
	
    $scope.signupUser = function(data) {
    	$http.signup('/auth/signup', $scope.formData)
        .success(function(data) {
          //  $scope.users = data;
        })
        .error(function(data) {
        });
    };
    $scope.loginUser = function(data) {
    	$http.login('/auth/login', $scope.formData)
    	.success(function(data) {
        })
        .error(function(data) {
        });
    };
    $scope.logoutUser = function(data) {
    	$http.logout('/auth/logout', $scope.formData)
    	.success(function(data) {
        })
        .error(function(data) {
        });
	};	
	$scope.authenticateFacebook = function(data) {
    	$http.authenticateFacebook('/auth/facebook', $scope.formData)
    	.success(function(data) {
        })
        .error(function(data) {
        });
	};   
	$scope.authenticateTwitter = function(data) {
    	$http.authenticateTwitter('/auth/twitter', $scope.formData)
    	.success(function(data) {
        })
        .error(function(data) {
        });
    };
	$scope.authorizeFacebook = function(data) {
    	$http.authorizeFacebook('/connect/facebook', $scope.formData)
    	.success(function(data) {
        })
        .error(function(data) {
        });
    };
	$scope.authenticateTwitter = function(data) {
    	$http.authorizeTwitter('/connect/twitter', $scope.formData)
    	.success(function(data) {
        })
        .error(function(data) {
        });
	};
	$scope.authenticateGoogle = function(data) {
    	$http.authorizeGoogle('/connect/google', $scope.formData)
    	.success(function(data) {
        })
        .error(function(data) {
        });
    };
    $scope.unlinkTwitter = function(data) {
    	$http.unlinkTwitter('/unlink/twitter', $scope.formData)
    	.success(function(data) {
        })
        .error(function(data) {
        });
    };
    $scope.unlinkFacebook = function(data) {
    	$http.unlinkFacebook('/unlink/facebook', $scope.formData)
    	.success(function(data) {
        })
        .error(function(data) {
        });
    };
    $scope.unlinkGoogle = function(data) {
    	$http.unlinkGoogle('/unlink/google', $scope.formData)
    	.success(function(data) {
        })
        .error(function(data) {
        });
    };
}]);