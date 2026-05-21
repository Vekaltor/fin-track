import {Pipe, PipeTransform} from '@angular/core';
import {GroupColor} from '@core/models/group-color.enum';

@Pipe({
  name: 'groupColorClass',
})
export class GroupColorClassPipe implements PipeTransform {
  private readonly map: Record<GroupColor, string> = {
    [GroupColor.BLUE]: 'bg-group-blue',
    [GroupColor.GREEN]: 'bg-group-green',
    [GroupColor.ORANGE]: 'bg-group-orange',
  };

  public transform(color: GroupColor): string {
    return this.map[color] ?? 'bg-group-blue';
  }
}
