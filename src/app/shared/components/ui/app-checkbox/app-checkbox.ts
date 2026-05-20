import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-checkbox',
  templateUrl: './app-checkbox.html',
})
export class AppCheckbox {
  public readonly checked: InputSignal<boolean> = input<boolean>(false);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly className: InputSignal<string> = input<string>('');

  public readonly checkedChange: OutputEmitterRef<boolean> = output<boolean>();

  protected boxClass(): string {
    return cn(
      'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition',
      this.checked()
        ? 'border-primary bg-primary text-white'
        : 'border-gray-300 bg-white',
      this.disabled() && 'opacity-50',
      this.className()
    );
  }

  protected onToggle(): void {
    if (this.disabled()) {
      return;
    }
    this.checkedChange.emit(!this.checked());
  }
}
