import {Pipe, PipeTransform} from '@angular/core';
import {Field, FieldState} from '@angular/forms/signals';

@Pipe({
  name: 'appFieldError',
  pure: true,
})
export class FieldErrorPipe implements PipeTransform {
  public transform(field: Field<unknown>): string {
    if (!field) {
      return '';
    }
    const fieldInstance: FieldState<unknown> = field();
    const errors: readonly {message?: string}[] = fieldInstance.errors() as readonly {
      message?: string;
    }[];
    if (!errors?.length) {
      return '';
    }
    const first: {message?: string} | undefined = errors[0];
    return first?.message ?? '';
  }
}
