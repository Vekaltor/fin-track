import {Pipe, PipeTransform} from '@angular/core';
import {formatCurrencyPln} from '@shared/helpers/format-currency-pln';

@Pipe({
  name: 'appCurrencyPln',
})
export class CurrencyPlnPipe implements PipeTransform {
  public transform(value: number | null | undefined, showSign = false): string {
    return formatCurrencyPln(value, showSign);
  }
}
