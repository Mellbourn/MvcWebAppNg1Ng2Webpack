/*
 * AddPinComponent: a component that controls the "add pin" page
 */
import { Component, Inject, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/AnalyticsService';
import { PinsService } from '../services/PinsService';

@Component({
    selector: 'simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {

    constructor(
        private analyticsService: AnalyticsService,
        @Inject('PinsService') private pinsService: PinsService) {
    }

    ngOnInit(): void {
        this.analyticsService.recordEvent("inside simple. Pins: " + this.pinsService.pins());
    }
}

