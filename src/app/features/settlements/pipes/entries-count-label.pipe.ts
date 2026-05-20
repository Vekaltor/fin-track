import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'entriesCountLabel',
})
export class EntriesCountLabelPipe implements PipeTransform {
  public transform(count: number): string {
    if (count === 1) {
      return '1 wpis';
    }
    const mod10: number = count % 10;
    const mod100: number = count % 100;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
      return `${count} wpisy`;
    }
    return `${count} wpisów`;
  }
}
