import {InstallmentStatus} from './installment-status.enum';

export interface Installment {
  readonly id: string;
  readonly index: number;
  readonly amount: number;
  /** Pierwotny termin z harmonogramu (niezmienny). */
  readonly plannedDueDate?: string;
  /** Aktualny termin (może być przesunięty wcześniej po nadpłacie). */
  readonly dueDate: string;
  readonly note?: string;
  readonly paymentMethod?: string;
  readonly status: InstallmentStatus;
  readonly paidAt?: string;
}
