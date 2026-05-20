import {Component, input, InputSignal} from '@angular/core';
import {Field, FormField} from '@angular/forms/signals';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-checkbox-field',
  imports: [FormField],
  templateUrl: './checkbox-field.html',
})
export class CheckboxField {
  public readonly field: InputSignal<Field<boolean>> = input.required<Field<boolean>>();
  public readonly className: InputSignal<string> = input<string>('');

  protected readonly cn = cn;
}
