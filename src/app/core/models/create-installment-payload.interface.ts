export interface CreateInstallmentPayload {
  amount: number;
  dueDate: string;
  note?: string;
}
