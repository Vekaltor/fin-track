import {EntryDirection} from '@core/models/entry-direction.enum';

export const ENTRY_DIRECTION_OPTIONS: readonly {
  value: EntryDirection;
  label: string;
}[] = [
  {value: EntryDirection.OwedToMe, label: 'Ktoś mi winien'},
  {value: EntryDirection.IOwe, label: 'Ja komuś winien'},
];
