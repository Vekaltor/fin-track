import {Pipe, PipeTransform} from '@angular/core';
import {GroupColor} from '@core/models/group-color.enum';

@Pipe({
  name: 'groupColorClass',
})
export class GroupColorClassPipe implements PipeTransform {
  private readonly map: Record<GroupColor, string> = {
    [GroupColor.Blue]: 'bg-group-blue',
    [GroupColor.Green]: 'bg-group-green',
    [GroupColor.Orange]: 'bg-group-orange',
  };

  public transform(color: GroupColor): string {
    return this.map[color] ?? 'bg-group-blue';
  }
}
