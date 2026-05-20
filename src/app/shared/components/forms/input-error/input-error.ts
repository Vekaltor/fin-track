import {Component, input, InputSignal} from '@angular/core';
import {FieldErrorPipe} from '@shared/pipes/field-error-pipe';
import {HasErrorPipe} from '@shared/pipes/has-error-pipe';
import {Field} from '@angular/forms/signals';

@Component({
  selector: 'app-input-error',
  imports: [FieldErrorPipe, HasErrorPipe],
  template: `
    @if (field() | appHasError : 'touched') {
      <p class="text-red-500 text-xs mt-1">
        {{ field() | appFieldError }}
      </p>
    }
  `
})
export class InputError {
  public readonly field: InputSignal<Field<unknown>> = input.required<Field<unknown>>();
}
