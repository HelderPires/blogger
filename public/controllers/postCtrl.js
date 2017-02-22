angular.module('postController', [])
.controller('postController', ['$scope', '$http', function($scope, $http) {
    //initialize formData
	$scope.formData = {};
	// get all posts and show them
    $http.get('/api/posts')
        .success(function(data) {
            $scope.posts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    // when submitting the add form, send the text to the node API
    $scope.createPost = function(data) {
    	var now = new Date();
        var timeStamp = now.getDate() + "/" + now.getMonth() + "/" + now.getYear() + "     " + now.getHours() + ":" + now.getMinutes();
        $scope.formData.publishDate = timeStamp;
    	$http.post('/api/posts/create/', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.posts = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // delete a post
    $scope.deletePost = function(id) {
        $http.delete('/api/posts/delete/' + id)
            .success(function(data) {
                $scope.posts = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // update a post
    $scope.updatePost = function(id, data){
    	var now = new Date();
        var timeStamp = now.getDate() + "/" + now.getMonth() + "/" + now.getYear() + "     " + now.getHours() + ":" + now.getMinutes();
        $scope.formData.publishDate = timeStamp;
    	$http.post('/api/posts/update/' + id, $scope.formData)
    		.success(function(data) {
    			$scope.formData = {}; // clear the form so our user is ready to enter another
    			$scope.posts = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
    		});
    };
}]);