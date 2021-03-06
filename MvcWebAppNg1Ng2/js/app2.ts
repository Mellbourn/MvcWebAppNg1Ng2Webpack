﻿/**
 *  Copyright (c) 2016, Fullstack.io
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './vendor/angular';

import 'core-js';
import 'zone.js';
import 'reflect-metadata';
import {
    NgModule,
    forwardRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
} from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { UpgradeAdapter } from '@angular/upgrade';
declare var angular: any;
import './app'; // "bare import" for side-effects
import { AnalyticsService } from "./services/AnalyticsService";
import { SimpleComponent } from "./component/simple.component";

//import { AddPinComponent } from './components/AddPinComponent';
//import { PinControlsComponent } from './components/PinControlsComponent';
//import { AnalyticsService } from './services/AnalyticsService';

/*
 * Create our upgradeAdapter
 */
const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(
    forwardRef(() => Ng2AppModule ));

/*
 * Expose our ng2 content to ng1
 */
angular.module('interestApp')
    .directive('simple',
        upgradeAdapter.downgradeNg2Component(SimpleComponent));

//angular.module('interestApp')
//    .directive('pinControls',
//    upgradeAdapter.downgradeNg2Component(PinControlsComponent))
//    .directive('addPin',
//    upgradeAdapter.downgradeNg2Component(AddPinComponent));

angular.module('interestApp')
    .factory('AnalyticsService',
    upgradeAdapter.downgradeNg2Provider(AnalyticsService));

/*
 * Expose our ng1 content to ng2
 */
upgradeAdapter.upgradeNg1Provider('PinsService');
//upgradeAdapter.upgradeNg1Provider('$state');

@NgModule({
    declarations: [
        SimpleComponent
        //PinControlsComponent,
        //AddPinComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule
    ],
    providers: [
        AnalyticsService,
    ]
})
class Ng2AppModule { }


/*
 * Bootstrap the App
 */
upgradeAdapter.bootstrap(document.body, ['interestApp']);


