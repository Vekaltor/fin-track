import {Pipe, PipeTransform} from '@angular/core';
import {FieldState, ValidationError} from '@angular/forms/signals';
import WithFieldTree = ValidationError.WithFieldTree;

@Pipe({
  name: 'appFieldError',
  pure: true,
})
export class AppFieldErrorPipe implements PipeTransform {
  transform(field: FieldState<unknown>): string {
    if (!field) return "";
    const errors: WithFieldTree[] = field.errors();
    return errors ? (Object.values(errors)[0].message as string) : "";
  }
}
