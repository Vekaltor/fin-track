import {Settlement} from '@core/models/settlement.interface';
import {SortField} from '@features/settlements/models/sort-field.enum';

export function sortSettlements(entries: Settlement[], sort: SortField): Settlement[] {
  const sorted: Settlement[] = [...entries];
  switch (sort) {
    case SortField.AMOUNT:
      return sorted.sort((a, b) => b.totalAmount - a.totalAmount);
    case SortField.NAME:
      return sorted.sort((a, b) => a.personName.localeCompare(b.personName, 'pl'));
    case SortField.DATE:
    default:
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }
}
