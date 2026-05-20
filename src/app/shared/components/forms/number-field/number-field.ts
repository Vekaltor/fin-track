import {Component, input, InputSignal} from '@angular/core';
import {Field} from '@angular/forms/signals';
import {InputMode} from '@shared/models/types/input-type.type';
import {GenericFormField} from '@shared/models/interfaces/generic-form-field.interface';
import {cn} from '@utils/cn';
import {InputError} from '@shared/components/forms/input-error/input-error';
import {InputField} from '@shared/components/forms/input-field/input-field';
import {InputLabel} from '@shared/components/forms/input-label/input-label';

@Component({
  selector: 'app-number-field',
  imports: [
    InputError,
    InputField,
    InputLabel
  ],
  templateUrl: './number-field.html',
})
export class NumberField implements GenericFormField<string> {
  public readonly field: InputSignal<Field<string>> = input.required<Field<string>>();
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly className: InputSignal<string> = input<string>("");
  public readonly showInlineError: InputSignal<boolean> = input<boolean>(true);
  public readonly label: InputSignal<string> = input.required<string>();
  public readonly inputMode: InputSignal<InputMode | undefined> = input<InputMode>();

  protected readonly cn = cn;
}
