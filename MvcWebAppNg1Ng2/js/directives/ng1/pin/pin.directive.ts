interface IPinScope extends ng.IScope {
    pin: any;
    toggleFav: () => void ;
}

export function pinDirective(
) : ng.IDirective
{
    return {
        restrict: 'E',
        templateUrl: '/pin.html',
        scope: {
            'pin': "=item"
        },
        link: ['scope', function(scope: IPinScope, elem, attrs) {
            scope.toggleFav = function() {
                scope.pin.faved = !scope.pin.faved;
            }
        }]
    }
}