import {Component} from '@angular/core';
import {SettlementsPage} from '@features/settlements/components/settlements-page/settlements-page';

@Component({
  selector: 'app-settlements-view',
  imports: [SettlementsPage],
  template: '<app-settlements-page />',
})
export class SettlementsView {}
