window.angular.module('littleBlog', [
    'angular-web-notification'
]).controller('exampleForm', ['$scope', function ($scope) {
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
                    onClick: function onNotificationClicked() {
                        console.log('Notification clicked.');
                    },
                    autoClose: 4000 //auto close the notification after 4 seconds (you can manually close it via hide function)
                }, function onShow(error, hide) {
                    if (error) {
                        window.alert('Unable to show notification: ' + error.message);
                    } else {
                        console.log('Notification Shown.');

                        setTimeout(function hideNotification() {
                            console.log('Hiding notification....');
                            hide();
                        }, 5000);
                    }
                });
            });
        }
    };
}]);