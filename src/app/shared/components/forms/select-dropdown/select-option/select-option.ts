import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {cn} from '@utils/cn';

@Component({
  selector: 'li[app-select-option]',
  host: {
    role: 'option',
    '[attr.aria-selected]': 'selected()',
  },
  imports: [],
  templateUrl: './select-option.html',
})
export class SelectOption {
  public readonly label: InputSignal<string> = input.required<string>();
  public readonly selected: InputSignal<boolean> = input<boolean>(false);
  public readonly clicked: OutputEmitterRef<void> = output<void>();
  protected readonly cn: Function = cn;
}
