import {Component, input, InputSignal} from '@angular/core';
import {Field} from '@angular/forms/signals';
import {InputError} from '@shared/components/forms/input-error/input-error';
import {InputLabel} from '@shared/components/forms/input-label/input-label';
import {SelectDropdown} from '@shared/components/forms/select-dropdown/select-dropdown';
import {SelectOption} from '@shared/models/types/select-option.type';
import {GenericFormField} from '@shared/models/interfaces/generic-form-field.interface';

@Component({
  selector: 'app-select-field',
  imports: [InputLabel, InputError, SelectDropdown],
  templateUrl: './select-field.html',
})
export class SelectField implements GenericFormField<string> {
  public readonly field: InputSignal<Field<string>> = input.required<Field<string>>();
  public readonly label: InputSignal<string> = input.required<string>();
  public readonly showInlineError: InputSignal<boolean> = input<boolean>(true);
  public readonly className: InputSignal<string> = input<string>('');
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly options: InputSignal<SelectOption[]> = input.required<SelectOption[]>();
}
