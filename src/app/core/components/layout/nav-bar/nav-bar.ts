import { Component } from '@angular/core';
import {NavItem} from '@core/components/layout/nav-item/nav-item';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-nav-bar',
  imports: [
    NavItem,
    NgIcon
  ],
  templateUrl: './nav-bar.html',
})
export class NavBar {}
