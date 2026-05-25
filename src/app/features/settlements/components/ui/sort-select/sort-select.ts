import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {SortField} from '@features/settlements/models/sort-field.enum';
import {SORT_FIELD_OPTIONS} from '../../../constants/sort-field-options';
import {SelectDropdown} from '@shared/components/forms/select-dropdown/select-dropdown';

@Component({
  selector: 'app-sort-select',
  imports: [SelectDropdown],
  templateUrl: './sort-select.html',
})
export class SortSelect {
  public readonly value: InputSignal<SortField> = input.required<SortField>();

  public readonly valueChange: OutputEmitterRef<SortField> = output<SortField>();

  protected readonly options = SORT_FIELD_OPTIONS;

  protected onSortChange(sort: SortField): void {
    this.valueChange.emit(sort);
  }
}
