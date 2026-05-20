import {Component, input, InputSignal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-item.html',
})
export class NavItem {
  public readonly label: InputSignal<string> = input.required<string>();
  public readonly link: InputSignal<string> = input.required<string>();
}
