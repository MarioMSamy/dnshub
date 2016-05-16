import {Component} from '@angular/core';
import {Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';

@Component({
    selector: 'dns-hub',
    templateUrl: 'app/app.component.html',
    directives: [DashboardComponent]
})
@Routes([
  {path: '/dashboard', component: DashboardComponent}
])
export class AppComponent { }
