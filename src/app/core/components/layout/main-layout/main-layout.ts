import { Component } from '@angular/core';
import {Sidebar} from '@core/components/layout/sidebar/sidebar';
import {Topbar} from '@core/components/layout/topbar/topbar';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    Sidebar,
    Topbar,
    RouterOutlet
  ],
  templateUrl: './main-layout.html',
})
export class MainLayout {}
