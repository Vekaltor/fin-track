import {Component, output, OutputEmitterRef} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';

@Component({
  selector: 'app-group-header-actions',
  imports: [NgIcon, AppButton],
  templateUrl: './group-header-actions.html',
})
export class GroupHeaderActions {
  public readonly addEntry: OutputEmitterRef<void> = output();
  public readonly deleteGroup: OutputEmitterRef<void> = output();
}
