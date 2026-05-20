import {Component, output, OutputEmitterRef} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroPlus, heroTrash} from '@ng-icons/heroicons/outline';
import {AppButton} from '@shared/components/ui/app-button/app-button';

@Component({
  selector: 'app-group-header-actions',
  imports: [NgIcon, AppButton],
  providers: [provideIcons({heroPlus, heroTrash})],
  templateUrl: './group-header-actions.html',
})
export class GroupHeaderActions {
  public readonly addEntry: OutputEmitterRef<void> = output<void>();
  public readonly deleteGroup: OutputEmitterRef<void> = output<void>();
}
