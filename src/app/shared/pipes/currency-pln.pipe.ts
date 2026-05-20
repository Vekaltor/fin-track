import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyPln',
})
export class CurrencyPlnPipe implements PipeTransform {
  public transform(value: number | null | undefined, showSign = false): string {
    if (value === null || value === undefined) {
      return '0 zł';
    }
    const formatted: string = new Intl.NumberFormat('pl-PL', {
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
    let sign = '';
    if (value < 0) {
      sign = '-';
    } else if (showSign && value > 0) {
      sign = '+';
    }
    return `${sign}${formatted} zł`;
  }
}
