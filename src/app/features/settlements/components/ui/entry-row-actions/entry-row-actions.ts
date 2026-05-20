import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  heroArchiveBox,
  heroChevronDown,
  heroChevronUp,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import {AppButton} from '@shared/components/ui/app-button/app-button';

@Component({
  selector: 'app-entry-row-actions',
  imports: [NgIcon, AppButton],
  providers: [provideIcons({heroArchiveBox, heroTrash, heroChevronDown, heroChevronUp})],
  templateUrl: './entry-row-actions.html',
})
export class EntryRowActions {
  public readonly expanded: InputSignal<boolean> = input<boolean>(false);

  public readonly archive: OutputEmitterRef<void> = output<void>();
  public readonly deleteEntry: OutputEmitterRef<void> = output<void>();
  public readonly toggleExpanded: OutputEmitterRef<void> = output<void>();
}
