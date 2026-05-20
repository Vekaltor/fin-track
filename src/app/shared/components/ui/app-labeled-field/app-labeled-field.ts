import {Component, input, InputSignal} from '@angular/core';

@Component({
  selector: 'app-labeled-field',
  template: `
    <div>
      <label class="mb-1 block text-xs font-semibold uppercase text-muted">
        {{ label() }}
      </label>
      <ng-content />
    </div>
  `,
})
export class AppLabeledField {
  public readonly label: InputSignal<string> = input.required<string>();
}
