import {Component, input, InputSignal} from '@angular/core';
import {GenericFormField} from '@shared/models/interfaces/generic-form-field.interface';
import {Field} from '@angular/forms/signals';
import {InputError} from '@shared/components/forms/input-error/input-error';
import {InputField} from '@shared/components/forms/input-field/input-field';
import {InputLabel} from '@shared/components/forms/input-label/input-label';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-date-field',
  imports: [
    InputError,
    InputField,
    InputLabel
  ],
  templateUrl: './date-field.html',
})
export class DateField implements GenericFormField<string> {
  public readonly field: InputSignal<Field<string>> = input.required<Field<string>>();
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly className: InputSignal<string> = input<string>("");
  public readonly showInlineError: InputSignal<boolean> = input<boolean>(true);
  public readonly label: InputSignal<string> = input.required<string>();

  protected readonly cn = cn;
}
