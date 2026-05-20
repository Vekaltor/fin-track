import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {SORT_FIELD_OPTIONS} from '../../../constants/filter-labels.constant';
import {SortField} from '@core/models/sort-field.enum';

@Component({
  selector: 'app-sort-select',
  templateUrl: './sort-select.html',
})
export class SortSelect {
  public readonly value: InputSignal<SortField> = input.required<SortField>();

  public readonly valueChange: OutputEmitterRef<SortField> = output<SortField>();

  protected readonly options = SORT_FIELD_OPTIONS;

  protected onChange(event: Event): void {
    const sort: SortField = (event.target as HTMLSelectElement).value as SortField;
    this.valueChange.emit(sort);
  }
}
