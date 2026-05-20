import {EntryStatus} from '@core/models/entry-status.enum';
import {EntryType} from '@core/models/entry-type.enum';

export const ENTRY_TYPE_LABELS: Record<EntryType, string> = {
  [EntryType.Debt]: 'dług',
  [EntryType.Receivable]: 'należność',
};

export const ENTRY_STATUS_LABELS: Record<EntryStatus, string> = {
  [EntryStatus.Open]: 'Aktualne',
  [EntryStatus.Overdue]: 'Po terminie',
  [EntryStatus.Settled]: 'Rozliczone',
  [EntryStatus.Archived]: 'Archiwum',
};

export const ENTRY_STATUS_BADGE_VARIANT: Record<
  EntryStatus,
  'success' | 'danger' | 'neutral' | 'warning'
> = {
  [EntryStatus.Open]: 'neutral',
  [EntryStatus.Overdue]: 'danger',
  [EntryStatus.Settled]: 'success',
  [EntryStatus.Archived]: 'neutral',
};
