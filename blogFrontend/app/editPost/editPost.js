var editPostModule = angular.module('postEditor', ['ui.tinymce']);

editPostModule.controller('TinyMceController', function($scope, $http) {
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
      console.log('Article sent ... ' + response);
    }, function(error) {
      console.log('Fail to sent, error: ' + error);
    });
    
      // console.log('Save clicked! \n' + "Title: \n" + $scope.postTitle + "\nBody: \n" + $scope.tinymceModel);
      console.log('Input check : ' + ariticle.title + "\nBody:\n" + ariticle.content);
  };

});