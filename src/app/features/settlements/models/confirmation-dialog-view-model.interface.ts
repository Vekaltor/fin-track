import {SettlementConfirmationAction} from '@features/settlements/models/settlement-confirmation-action.enum';

export interface ConfirmationDialogViewModel {
  action: SettlementConfirmationAction;
  groupId: string;
  entryId?: string;
  personName?: string;
}
