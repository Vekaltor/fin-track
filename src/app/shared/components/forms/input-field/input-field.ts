import {Component, input, InputSignal} from '@angular/core';
import {Field, FormField} from '@angular/forms/signals';
import {InputMode, InputType} from '@shared/models/types/input-type.type';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-input-field',
  imports: [FormField],
  template: `
    <input
      [type]="type()"
      [attr.inputmode]="inputMode()"
      [placeholder]="placeholder()"
      [formField]="field()"
      [class]="cn(
      'w-full rounded-lg border bg-white border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15',
      className()
      )"
    />
  `,
})
export class InputField<T extends string | number | boolean = string> {
  public field: InputSignal<Field<T>> = input.required<Field<T>>();
  public readonly type: InputSignal<InputType> = input<InputType>('text');
  public readonly inputMode: InputSignal<InputMode | undefined> = input<InputMode>();
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly className: InputSignal<string> = input<string>("");
  protected readonly cn = cn;
}
