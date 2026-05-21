import {SortField} from '@core/models/sort-field.enum';
import {StatusFilter} from '@core/models/status-filter.enum';
import {TypeFilter} from '@core/models/type-filter.enum';

export const TYPE_FILTER_OPTIONS: {value: TypeFilter; label: string}[] = [
  {value: TypeFilter.ALL, label: 'Wszystkie'},
  {value: TypeFilter.RECEIVABLE, label: 'Należności'},
  {value: TypeFilter.DEBT, label: 'Długi'},
];

export const STATUS_FILTER_OPTIONS: {value: StatusFilter; label: string}[] = [
  {value: StatusFilter.ALL, label: 'Wszystkie statusy'},
  {value: StatusFilter.OPEN, label: 'Otwarte'},
  {value: StatusFilter.OVERDUE, label: 'Po terminie'},
  {value: StatusFilter.SETTLED, label: 'Rozliczone'},
  {value: StatusFilter.ARCHIVED, label: 'Archiwum'},
];

export const SORT_FIELD_OPTIONS: {value: SortField; label: string}[] = [
  {value: SortField.DATE, label: 'Data'},
  {value: SortField.AMOUNT, label: 'Kwota'},
  {value: SortField.NAME, label: 'Nazwa'},
];
