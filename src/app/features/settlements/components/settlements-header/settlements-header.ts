import {Component, output, OutputEmitterRef} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';

@Component({
  selector: 'app-settlements-header',
  imports: [AppButton, NgIcon],
  templateUrl: './settlements-header.html',
})
export class SettlementsHeader {
  public readonly newGroupClicked: OutputEmitterRef<void> = output();
}
