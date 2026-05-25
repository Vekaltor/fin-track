import {InstallmentStatus} from './installment-status.enum';

export interface Installment {
  readonly id: string;
  readonly index: number;
  readonly amount: number;
  // TODO przerobic zeby backend zwracał tylko 1 date a FE sam algorytmem wylcizał drugą date
  readonly plannedDueDate?: string;
  readonly dueDate: string;
  readonly note?: string;
  readonly status: InstallmentStatus;
  readonly paidAt?: string;
}
