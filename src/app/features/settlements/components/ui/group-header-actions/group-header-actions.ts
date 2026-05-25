import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {TooltipDirective} from '@shared/directives/tooltip-directive';
import {FilteredSettlementGroup} from '@features/settlements/models/filtered-settlement-group.interface';

@Component({
  selector: 'app-group-header-actions',
  imports: [NgIcon, AppButton, TooltipDirective],
  templateUrl: './group-header-actions.html',
})
export class GroupHeaderActions {
  public readonly group: InputSignal<FilteredSettlementGroup> = input.required();
  public readonly addEntry: OutputEmitterRef<void> = output();
  public readonly deleteGroup: OutputEmitterRef<void> = output();
}
