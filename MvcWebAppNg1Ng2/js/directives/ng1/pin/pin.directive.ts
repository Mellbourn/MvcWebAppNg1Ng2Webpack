export function pinDirective(
) // : ng.IDirective
{
    return {
        restrict: 'E',
        templateUrl: '/pin.html',
        scope: {
            'pin': "=item"
        },
        link: function(scope, elem, attrs) {
            scope.toggleFav = function() {
                scope.pin.faved = !scope.pin.faved;
            }
        }
    }
}