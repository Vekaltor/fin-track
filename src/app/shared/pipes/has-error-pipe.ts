import {Pipe, PipeTransform} from '@angular/core';
import {Field, FieldState} from '@angular/forms/signals';

export type ErrorTrigger = 'touched' | 'dirty' | 'always' | 'submitted';

@Pipe({
  name: 'appHasError',
  pure: false
})
export class HasErrorPipe implements PipeTransform {

  transform(field: Field<unknown>, trigger: ErrorTrigger = 'submitted'): boolean {
    if (!field) return false;

    const fieldInstance: FieldState<unknown> = field();
    const isInvalid: boolean = fieldInstance.invalid();

    switch (trigger) {
      case 'submitted':
      case 'touched':
        return isInvalid && fieldInstance.touched();
      case 'dirty':
        return isInvalid && fieldInstance.dirty();
      case 'always':
      default:
        return isInvalid;
    }
  }
}
