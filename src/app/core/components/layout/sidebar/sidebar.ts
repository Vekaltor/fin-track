import {Component} from '@angular/core';
import {LogoutSection} from '@core/components/layout/logout-section/logout-section';
import {Brand} from '@core/components/layout/brand/brand';
import {NavBar} from '@core/components/layout/nav-bar/nav-bar';

@Component({
  selector: 'app-sidebar',
  imports: [
    LogoutSection,
    Brand,
    NavBar
  ],
  templateUrl: './sidebar.html',
})
export class Sidebar {
}
