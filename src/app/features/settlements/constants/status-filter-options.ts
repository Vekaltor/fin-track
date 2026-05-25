import {SelectOption} from '@shared/models/types/select-option.type';
import {StatusFilter} from '@features/settlements/models/status-filter.enum';

export const STATUS_FILTER_OPTIONS: SelectOption<StatusFilter>[] = [
  {value: StatusFilter.ALL, label: 'Wszystkie statusy'},
  {value: StatusFilter.OPEN, label: 'Otwarte'},
  {value: StatusFilter.OVERDUE, label: 'Po terminie'},
  {value: StatusFilter.SETTLED, label: 'Rozliczone'},
  {value: StatusFilter.ARCHIVED, label: 'Archiwum'},
];
