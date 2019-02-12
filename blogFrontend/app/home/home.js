(function () {
    'use strict';

    angular
        .module('littleBlog')
        .controller('HomeController', Controller);
    
        // Posts controller
    function Controller($scope, $http) {
        // Get all posts from database
        $http.get('http://localhost:3000/api/posts/')
        .then(function fetchedPosts(response) {
            $scope.myPosts = response.data.posts;
        }, function fetchingError(response) {
            console.log("error: " + response);
        });
    }

})();