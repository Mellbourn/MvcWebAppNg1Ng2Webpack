declare var angular;

angular.module('interestApp')
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