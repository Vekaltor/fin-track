import {Pipe, PipeTransform} from '@angular/core';
import {Field, FieldState, ValidationError} from '@angular/forms/signals';
import WithFieldTree = ValidationError.WithFieldTree;

@Pipe({
  name: 'appFieldError',
  pure: true,
})
export class FieldErrorPipe implements PipeTransform {
  transform(field: Field<unknown>): string {
    if (!field) return "";
    const fieldInstance: FieldState<unknown> = field();
    const errors: WithFieldTree[] = fieldInstance.errors();
    return errors ? (Object.values(errors)[0].message as string) : "";
  }
}
