var littleBlog = angular
    .module('littleBlog', ['ngSanitize', 'ui.router', 'ngStorage', 'ui.tinymce', 'cgNotify'])
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