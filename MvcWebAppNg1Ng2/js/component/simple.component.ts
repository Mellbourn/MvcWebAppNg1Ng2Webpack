﻿/*
 * AddPinComponent: a component that controls the "add pin" page
 */
import { Component, Inject, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/AnalyticsService';

@Component({
    selector: 'simple',
    template: `<p class="hejbaberiba">Hej!</p>`,
    styleUrls: ['./simple.component.css']
    //templateUrl: '/templates/add-ng2.html'
})
export class SimpleComponent implements OnInit {

    constructor(private analyticsService: AnalyticsService) {
    }

    ngOnInit(): void {
        this.analyticsService.recordEvent("inside simple");
    }
}
