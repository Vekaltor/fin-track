import {Component, output, OutputEmitterRef} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroPlus} from '@ng-icons/heroicons/outline';
import {AppButton} from '@shared/components/ui/app-button/app-button';

@Component({
  selector: 'app-settlements-header',
  imports: [AppButton, NgIcon],
  providers: [provideIcons({heroPlus})],
  templateUrl: './settlements-header.html',
})
export class SettlementsHeader {
  public readonly newGroupClicked: OutputEmitterRef<void> = output<void>();
}
