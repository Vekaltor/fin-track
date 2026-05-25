import {SelectOption} from '@shared/models/types/select-option.type';
import {TypeFilter} from '@features/settlements/models/type-filter.enum';

export const TYPE_FILTER_OPTIONS: SelectOption<TypeFilter>[] = [
  {value: TypeFilter.ALL, label: 'Wszystkie'},
  {value: TypeFilter.RECEIVABLE, label: 'Należności'},
  {value: TypeFilter.DEBT, label: 'Długi'},
];
