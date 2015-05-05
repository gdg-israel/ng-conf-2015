var app = angular.module('ngConfApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', function ($scope) {
    $scope.hachanaLeMazgan = '';
}]);

app.filter('speakerImageName', function () {
    return function (name) {
        return name ? name.replace(/\s/g, '') : '';
    };
});

// Templates are defined as <script> elements in index.html
app.directive('speaker', function () {
    return {
        restrict: 'E',
        templateUrl: 'speaker-template',
        replace: true,
        scope: {
            name: '@',
            github: '@',
            twitter: '@'
        }
    }
});
