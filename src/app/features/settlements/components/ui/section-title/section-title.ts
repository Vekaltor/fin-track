import {Component, input, InputSignal} from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: `
    <h4 class="mb-4 text-xs font-semibold tracking-wide text-muted uppercase">
      @if (title()) {
        {{ title() }}
      } @else {
        <ng-content/>
      }
    </h4>
  `,
})
export class SectionTitle {
  public readonly title: InputSignal<string> = input('');
}
