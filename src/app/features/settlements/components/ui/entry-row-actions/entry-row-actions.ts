import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';

@Component({
  selector: 'app-entry-row-actions',
  imports: [NgIcon, AppButton],
  templateUrl: './entry-row-actions.html',
})
export class EntryRowActions {
  public readonly expanded: InputSignal<boolean> = input(false);

  public readonly archive: OutputEmitterRef<void> = output();
  public readonly deleteEntry: OutputEmitterRef<void> = output();
  public readonly toggleExpanded: OutputEmitterRef<void> = output();
}
