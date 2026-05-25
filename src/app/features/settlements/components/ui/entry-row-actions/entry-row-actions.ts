import {Component, computed, input, InputSignal, output, OutputEmitterRef, Signal} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {TooltipDirective} from '@shared/directives/tooltip-directive';

@Component({
  selector: 'app-entry-row-actions',
  imports: [NgIcon, AppButton, TooltipDirective],
  templateUrl: './entry-row-actions.html',
})
export class EntryRowActions {
  public readonly expanded: InputSignal<boolean> = input(false);

  public readonly archive: OutputEmitterRef<void> = output();
  public readonly deleteEntry: OutputEmitterRef<void> = output();
  public readonly toggleExpanded: OutputEmitterRef<void> = output();

  protected readonly expandedTooltipText: Signal<string> = computed(()=>
    this.expanded() ? "Zwiń listę" : "Rozwiń listę"
  )
}
