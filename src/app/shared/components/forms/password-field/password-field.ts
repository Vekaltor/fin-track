import {Component, input, InputSignal} from '@angular/core';
import {Field} from '@angular/forms/signals';
import {InputLabel} from '@shared/components/forms/input-label/input-label';
import {InputField} from '@shared/components/forms/input-field/input-field';
import {InputError} from '@shared/components/forms/input-error/input-error';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-password-field',
  imports: [
    InputLabel,
    InputField,
    InputError
  ],
  templateUrl: './password-field.html',
  styleUrl: './password-field.css',
})
export class PasswordField {
  public field: InputSignal<Field<string>> = input.required<Field<string>>();
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly className: InputSignal<string> = input<string>("");
  public readonly showInlineError: InputSignal<boolean> = input<boolean>(true);
  public readonly label: InputSignal<string> = input.required<string>();
  protected readonly cn = cn();

  /*
    Here will be specific logic for password field example: levels of validation, tooltips etc.
   */
}
