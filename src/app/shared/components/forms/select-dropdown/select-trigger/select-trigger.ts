import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {cn} from '@utils/cn';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-select-trigger',
  imports: [
    NgIcon
  ],
  templateUrl: './select-trigger.html',
})
export class SelectTrigger {
  public readonly isOpen: InputSignal<boolean> = input.required<boolean>();
  public readonly label: InputSignal<string> = input.required<string>();
  public readonly className: InputSignal<string> = input<string>('');
  public readonly clicked: OutputEmitterRef<void> = output<void>();
  protected readonly cn = cn;
}
