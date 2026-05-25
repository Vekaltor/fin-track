import {SortField} from '@features/settlements/models/sort-field.enum';
import {SelectOption} from '@shared/models/types/select-option.type';

export const SORT_FIELD_OPTIONS: SelectOption<SortField>[] = [
  {value: SortField.DATE, label: 'Data'},
  {value: SortField.AMOUNT, label: 'Kwota'},
  {value: SortField.NAME, label: 'Nazwa'},
];
