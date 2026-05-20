import {Component, input, InputSignal} from '@angular/core';
import {GroupColor} from '@core/models/group-color.enum';
import {GroupColorClassPipe} from '../../../pipes/group-color-class.pipe';

@Component({
  selector: 'app-group-color-dot',
  imports: [GroupColorClassPipe],
  template: `
    <span class="h-3 w-3 rounded-full" [class]="color() | groupColorClass"></span>
  `,
})
export class GroupColorDot {
  public readonly color: InputSignal<GroupColor> = input.required<GroupColor>();
}
