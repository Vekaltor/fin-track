import {Pipe, PipeTransform} from '@angular/core';
import {FieldState} from '@angular/forms/signals';

@Pipe({
  name: 'fieldError',
  pure: true,
  standalone: true,
})
export class FieldErrorPipe implements PipeTransform {
  transform(field: FieldState<unknown>): string {
    if (!field) return "";
    const errors = field.errors();
    return errors ? (Object.values(errors)[0].message as string) : "";
  }
}
