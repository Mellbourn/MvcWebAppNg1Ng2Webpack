declare var angular;

angular.module('interestApp').directive('pin', function () {
    return {
        restrict: 'E',
        templateUrl: '/pin.html',
        scope: {
            'pin': "=item"
        },
        link: function (scope, elem, attrs) {
            scope.toggleFav = function () {
                scope.pin.faved = !scope.pin.faved;
            }
        }
    }
});