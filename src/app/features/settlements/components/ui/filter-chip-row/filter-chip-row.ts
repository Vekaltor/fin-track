import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';

export interface FilterChipOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

@Component({
  selector: 'app-filter-chip-row',
  imports: [AppButton],
  templateUrl: './filter-chip-row.html',
})
export class FilterChipRow<T extends string> {
  public readonly options: InputSignal<readonly FilterChipOption<T>[]> =
    input.required<readonly FilterChipOption<T>[]>();
  public readonly activeValue: InputSignal<T> = input.required<T>();

  public readonly selected: OutputEmitterRef<T> = output<T>();

  protected onSelect(value: T): void {
    this.selected.emit(value);
  }
}
