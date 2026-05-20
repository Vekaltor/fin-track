import {Component, input, InputSignal} from '@angular/core';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-input-label',
  imports: [],
  template: `
    <label [class]="cn('block text-xs font-medium text-gray-500 mb-1', className())">
      {{ label() }}
    </label>
  `
})
export class InputLabel {
  public readonly label: InputSignal<string> = input<string>("");
  public readonly className: InputSignal<string> = input<string>("");
  protected readonly cn = cn;
}
