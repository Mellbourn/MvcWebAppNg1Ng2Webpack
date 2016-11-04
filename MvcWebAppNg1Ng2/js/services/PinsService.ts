import { AnalyticsService } from './AnalyticsService';

export class PinsService {

    private _pins = null;

    public static $inject = [ '$http', '$q', 'AnalyticsService' ];

    public pins = () => {
        var self = this;
        if (self._pins == null) {
            // initialize with sample data
            return this.$http.get("/js/data/sample-data.json")
                .then(
                response => {
                    this._pins = response.data;
                    return this._pins;
                });
        } else {
            return this.$q.when(self._pins);
        }
    }

    public addPin = (newPin) => {
        // adding would normally be an API request so lets mock async
        return this.$q.when(
            this._pins.unshift(newPin)
        );
    }

    constructor(private $http, private $q, analyticsServcie: AnalyticsService) {
        analyticsServcie.recordEvent("called from PinService");
    }
}
