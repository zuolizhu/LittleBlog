(function () {
  'use strict';

  angular
      .module('littleBlog')
      .controller('TinyMceController', Controller);

  function Controller($scope, $http, $location, webNotification) {
    $scope.tinymceModel = 'Initial content';
    $scope.getContent = function() {
      console.log('Editor content:', $scope.tinymceModel);
    };

    $scope.setContent = function() {
      $scope.tinymceModel = 'Time: ' + (new Date());
    };

    $scope.tinymceOptions = {
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    };

    $scope.savePost = function() {
      const ariticle = {
        title: $scope.postTitle,
        content: $scope.tinymceModel
      };
      $http.post('http://localhost:3000/api/posts/', ariticle)
      .then(function(response) {
        console.log('Ariticle published! ' + response.data);
        $location.path('/');
        // Push notification after successful publish the article
        webNotification.showNotification('Little Blog', {
          body: 'An new article has been published!',
          autoClose: 7000
        });
      }, function(error) {
        console.log('Fail to sent, error: ' + error);
      });
    };
    
  }

})();