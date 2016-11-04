import './vendor/lodash';
import './vendor/angular-ui-router';
import { PinsService } from './services/PinsService';

declare var angular;

angular.module('interestApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('home', {
                templateUrl: '/home.html',
                controller: 'HomeController as ctrl',
                url: '/',
                resolve: {
                    'pins': ['PinsService', function (pinsService: PinsService) {
                        return pinsService.pins();
                    }]
                }
            })
            .state('add', {
                templateUrl: '/add.html',
                controller: 'AddController as ctrl',
                url: '/add',
                resolve: {
                    'pins': ['PinsService', function (pinsService: PinsService) {
                        return pinsService.pins();
                    }]
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
    .controller('AddController', ['$state', 'PinsService', '$timeout', function ($state, pinsService: PinsService, $timeout) {
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
            pinsService.addPin(ctrl.newPin).then(() => {
                ctrl.newPin = makeNewPin();
                ctrl.saving = false;
                $state.go('home');
            });
        }, 2000);
    }
}])


import './services/0.angular1ServicesModule';
import './directives/ng1/pin';