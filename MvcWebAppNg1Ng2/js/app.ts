﻿import './vendor/lodash';
import './vendor/angular-ui-router';

declare var angular;

angular.module('interestApp', ['ui.router'])
    .service('PinsService', ['$http', '$q', function ($http, $q) {
    this._pins = null;

    this.pins = function () {
        var self = this;
        if (self._pins == null) {
            // initialize with sample data
            return $http.get("/js/data/sample-data.json")
                .then(
                    response => {
                        this._pins = response.data;
                        return this._pins;
                    });
        } else {
            return $q.when(self._pins);
        }
    }

    this.addPin = function (newPin) {
        // adding would normally be an API request so lets mock async
        return $q.when(
          this._pins.unshift(newPin)
        );
    }
}])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('home', {
                templateUrl: '/home.html',
                controller: 'HomeController as ctrl',
                url: '/',
                resolve: {
                    'pins': function (PinsService) {
                        return PinsService.pins();
                    }
                }
            })
            .state('add', {
                templateUrl: '/add.html',
                controller: 'AddController as ctrl',
                url: '/add',
                resolve: {
                    'pins': function (PinsService) {
                        return PinsService.pins();
                    }
                }
            })

        $urlRouterProvider.when('', '/');
    }])
.filter('truncate', () => (input, amt) => {
        if (input.length > amt) {
            return input.substring(0, amt);
        } else {
            return input;
        }
    })
    .controller('HomeController', ['pins', 'AnalyticsService', function (pins, AnalyticsService) {
        AnalyticsService.recordEvent('HomeControllerVisited');
    this.pins = pins;
}])
    .controller('AddController', ['$state', 'PinsService', '$timeout', function ($state, PinsService, $timeout) {
    var ctrl = this;
    ctrl.saving = false;

    var makeNewPin = () => ({
        "title": "Steampunk Cat",
        "description": "A cat wearing goggles",
        "user_name": "me",
        "avatar_src": require("./images/avatars/me.jpg"),
        "src": require("./images/pins/cat.jpg"),
        "url": "http://cats.com",
        "faved": false,
        "id": Math.floor(Math.random() * 10000).toString()
    })

    ctrl.newPin = makeNewPin();

    ctrl.submitPin = function () {
        ctrl.saving = true;
        $timeout(function () {
            PinsService.addPin(ctrl.newPin).then(() => {
                ctrl.newPin = makeNewPin();
                ctrl.saving = false;
                $state.go('home');
            });
        }, 2000);
    }
}])
.directive('pin', function () {
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
})


//  
