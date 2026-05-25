import {EntryDirection} from '@core/models/entry-direction.enum';
import {SelectOption} from '@shared/models/types/select-option.type';

export const ENTRY_DIRECTION_OPTIONS: SelectOption<EntryDirection>[] = [
  {value: EntryDirection.OWED_TO_ME, label: 'Ktoś mi winien'},
  {value: EntryDirection.I_OWE, label: 'Ja komuś winien'},
];
