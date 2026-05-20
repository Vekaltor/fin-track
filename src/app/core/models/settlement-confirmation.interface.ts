import {SettlementConfirmationAction} from './settlement-confirmation-action.enum';

export interface SettlementConfirmation {
  readonly action: SettlementConfirmationAction;
  readonly groupId: string;
  readonly entryId?: string;
  readonly personName?: string;
  readonly groupName?: string;
}
