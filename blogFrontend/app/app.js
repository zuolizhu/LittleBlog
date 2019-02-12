var littleBlog = angular.module('littleBlog', ['ngSanitize', 'angular-web-notification']);

// Posts controller
littleBlog.controller('mainController', function PostListController($scope, $http){
    // Get all posts from database
    $http.get('http://localhost:3000/api/posts/')
    .then(function fetchedPosts(response){
        $scope.myPosts = response.data.posts;
    }, function fetchingError(response){
        console.log("error: " + response);
    });
});

// Notification controller
littleBlog.controller('exampleForm', ['$scope', function ($scope) {
    'use strict';
    $scope.title = 'Little Blog Update';
    $scope.text = 'There is a new article uploaded!';
}]).directive('showButton', ['webNotification', function (webNotification) {
    'use strict';
    var serviceWorkerRegistration;
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            serviceWorkerRegistration = registration;
        });
    }

    return {
        restrict: 'C',
        scope: {
            notificationTitle: '=',
            notificationText: '='
        },
        link: function (scope, element) {
            element.on('click', function onClick() {
                webNotification.showNotification(scope.notificationTitle, {
                    serviceWorkerRegistration: serviceWorkerRegistration,
                    body: scope.notificationText,
                    autoClose: 6000 //auto close the notification after 6 seconds
                }, function onShow(error, hide) {
                    if (error) {
                        window.alert('Unable to show notification: ' + error.message);
                    } else {
                        console.log('Notification Shown.');
                    }
                });
            });
        }
    };
}]);