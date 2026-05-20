import {SortField} from '@core/models/sort-field.enum';
import {StatusFilter} from '@core/models/status-filter.enum';
import {TypeFilter} from '@core/models/type-filter.enum';

export const TYPE_FILTER_OPTIONS: readonly {value: TypeFilter; label: string}[] = [
  {value: TypeFilter.All, label: 'Wszystkie'},
  {value: TypeFilter.Receivable, label: 'Należności'},
  {value: TypeFilter.Debt, label: 'Zobowiązania'},
];

export const STATUS_FILTER_OPTIONS: readonly {value: StatusFilter; label: string}[] = [
  {value: StatusFilter.All, label: 'Wszystkie statusy'},
  {value: StatusFilter.Open, label: 'Aktualne'},
  {value: StatusFilter.Overdue, label: 'Po terminie'},
  {value: StatusFilter.Settled, label: 'Rozliczone'},
  {value: StatusFilter.Archived, label: 'Archiwum'},
];

export const SORT_FIELD_OPTIONS: readonly {value: SortField; label: string}[] = [
  {value: SortField.Date, label: 'Data'},
  {value: SortField.Amount, label: 'Kwota'},
  {value: SortField.Name, label: 'Nazwa'},
];
