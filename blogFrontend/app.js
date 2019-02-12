var littleBlog = angular
    .module('littleBlog', ['ngSanitize', 'angular-web-notification', 'ui.router', 'ngStorage'])
    .config(config)
    .run(run);

// routes configuration
function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    // app routes
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .state('newpost', {
            url: '/newpost',
            templateUrl: 'app/editPost/editPost.html',
            controller: 'TinyMceController'
        })
        ;

    $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
}

// application init
function run($rootScope, $http, $location, $localStorage){
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });
}

// Posts controller
// littleBlog.controller('mainController', function PostListController($scope, $http){
//     // Get all posts from database
//     $http.get('http://localhost:3000/api/posts/')
//     .then(function fetchedPosts(response){
//         $scope.myPosts = response.data.posts;
//     }, function fetchingError(response){
//         console.log("error: " + response);
//     });
// });

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