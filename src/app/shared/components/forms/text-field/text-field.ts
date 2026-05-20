import {Component, input, InputSignal} from '@angular/core';
import {Field} from '@angular/forms/signals';
import {cn} from '@utils/cn';
import {InputLabel} from '@shared/components/forms/input-label/input-label';
import {InputField} from '@shared/components/forms/input-field/input-field';
import {InputError} from '@shared/components/forms/input-error/input-error';

@Component({
  selector: 'app-text-field',
  imports: [
    InputLabel,
    InputField,
    InputError
  ],
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
})
export class TextField {
  public field: InputSignal<Field<string>> = input.required<Field<string>>();
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly className: InputSignal<string> = input<string>("");
  public readonly showInlineError: InputSignal<boolean> = input<boolean>(true);
  public readonly label: InputSignal<string> = input.required<string>();
  protected readonly cn = cn;
}
