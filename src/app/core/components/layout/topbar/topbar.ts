import { Component } from '@angular/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-topbar',
  imports: [
    AppButton,
    NgIcon
  ],
  templateUrl: './topbar.html',
})
export class Topbar {}
