/*
 * AddPinComponent: a component that controls the "add pin" page
 */
import { Component, Inject } from '@angular/core';
import { AnalyticsService } from '../services/AnalyticsService';

@Component({
    selector: 'simple',
    template: `<p>Hej!</p>`
    //templateUrl: '/templates/add-ng2.html'
})
export class SimpleComponent {

    constructor(private analyticsService: AnalyticsService) {
    }
}

