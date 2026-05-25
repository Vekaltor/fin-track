import {SettlementConfirmationAction} from './settlement-confirmation-action.enum';

export interface SettlementConfirmation {
  action: SettlementConfirmationAction;
  groupId: string;
  entryId?: string;
  personName?: string;
  groupName?: string;
}
