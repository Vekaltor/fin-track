import {Pipe, PipeTransform} from '@angular/core';
import {FieldState} from '@angular/forms/signals';

export type ErrorTrigger = 'touched' | 'dirty' | 'always' | 'submitted';

@Pipe({
  name: 'hasError',
  pure: false
})
export class HasErrorPipe implements PipeTransform {

  transform(field: FieldState<unknown>, trigger: ErrorTrigger = 'submitted'): boolean {
    if (!field) return false;

    const isInvalid: boolean = field.invalid();

    switch (trigger) {
      case 'submitted':
      case 'touched':
        return isInvalid && field.touched();
      case 'dirty':
        return isInvalid && field.dirty();
      case 'always':
      default:
        return isInvalid;
    }
  }
}
