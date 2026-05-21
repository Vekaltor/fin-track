import {Pipe, PipeTransform} from '@angular/core';
import {monthNames} from '@shared/constants/month-names';

@Pipe({
  name: 'appShortDatePl',
})
export class ShortDatePlPipe implements PipeTransform {
  public transform(value: string | Date | null | undefined): string {
    const date: Date | null = this.parseDate(value);
    if (!date) return '';
    const day: number = date.getDate();
    const month: string = monthNames[date.getMonth()] ?? '';
    const year: number = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  private parseDate(value: string | Date | null | undefined): Date | null {
    if (!value) {
      return null;
    }
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const isoLocal: Date = new Date(`${value}T12:00:00`);
      return Number.isNaN(isoLocal.getTime()) ? null : isoLocal;
    }
    const parsed: Date = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
}
