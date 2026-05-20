import {Component, input, InputSignal} from '@angular/core';
import {Field, FormField} from '@angular/forms/signals';
import {InputType} from '@shared/models/types/input-type.type';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-input-field',
  imports: [FormField],
  template: `
    <input
      [type]="type()"
      [placeholder]="placeholder()"
      [formField]="field()"
      [class]="cn(
      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition',
      className()
      )"
    />
  `,
})
export class InputField<T extends string | number | boolean = string> {
  public field: InputSignal<Field<T>> = input.required<Field<T>>();
  public readonly type: InputSignal<InputType> = input<InputType>('text');
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly className: InputSignal<string> = input<string>("");
  protected readonly cn = cn;
}
