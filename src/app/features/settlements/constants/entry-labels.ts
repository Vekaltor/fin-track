import {EntryStatus} from '@core/models/entry-status.enum';
import {EntryType} from '@core/models/entry-type.enum';

export const ENTRY_TYPE_LABELS: Record<EntryType, string> = {
  [EntryType.DEBT]: 'dług',
  [EntryType.RECEIVABLE]: 'należność',
};

export const ENTRY_STATUS_LABELS: Record<EntryStatus, string> = {
  [EntryStatus.OPEN]: 'Otwarte',
  [EntryStatus.OVERDUE]: 'Po terminie',
  [EntryStatus.SETTLED]: 'Rozliczone',
  [EntryStatus.ARCHIVED]: 'Archiwum',
};

export const ENTRY_STATUS_BADGE_VARIANT: Record<
  EntryStatus,
  'success' | 'danger' | 'neutral' | 'warning'
> = {
  [EntryStatus.OPEN]: 'neutral',
  [EntryStatus.OVERDUE]: 'danger',
  [EntryStatus.SETTLED]: 'success',
  [EntryStatus.ARCHIVED]: 'neutral',
};
