import {InputSignal} from '@angular/core';
import {Field} from '@angular/forms/signals';

export interface GenericFormField<T> {
  readonly field: InputSignal<Field<T>>;
  readonly label: InputSignal<string>;
  readonly showInlineError: InputSignal<boolean>;
  readonly className: InputSignal<string>;
  readonly placeholder: InputSignal<string>;
}
