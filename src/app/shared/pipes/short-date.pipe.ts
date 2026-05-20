import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortDatePl',
})
export class ShortDatePlPipe implements PipeTransform {
  private readonly monthNames: readonly string[] = [
    'sty',
    'lut',
    'mar',
    'kwi',
    'maj',
    'cze',
    'lip',
    'sie',
    'wrz',
    'paź',
    'lis',
    'gru',
  ];

  public transform(value: string | Date | null | undefined): string {
    if (!value) {
      return '';
    }
    const date: Date = typeof value === 'string' ? new Date(value) : value;
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    const day: number = date.getDate();
    const month: string = this.monthNames[date.getMonth()] ?? '';
    return `${day} ${month}`;
  }
}
