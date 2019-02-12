(function () {
    'use strict';

    angular
        .module('littleBlog')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(email, password, callback) {
            $http.post('http://localhost:3000/api/user/login', { email: email, password: password })
            .then(function successCallback(response){
                if(response.data.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { email: email, token: response.data.token };
                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    // execute callback with true to indicate successful login
                    callback(true);
                }
            }, function errorCallback(response){
                console.log('error: ' + response.data);
                // execute callback with false to indicate failed login
                callback(false);
            });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();