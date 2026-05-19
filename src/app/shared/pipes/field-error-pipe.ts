import {Pipe, PipeTransform} from '@angular/core';
import {FieldState, ValidationError} from '@angular/forms/signals';
import WithFieldTree = ValidationError.WithFieldTree;

@Pipe({
  name: 'fieldError',
  pure: true,
})
export class FieldErrorPipe implements PipeTransform {
  transform(field: FieldState<unknown>): string {
    if (!field) return "";
    const errors: WithFieldTree[] = field.errors();
    return errors ? (Object.values(errors)[0].message as string) : "";
  }
}
