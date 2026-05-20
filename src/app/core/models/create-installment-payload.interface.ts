export interface CreateInstallmentPayload {
  readonly amount: number;
  readonly dueDate: string;
  readonly note?: string;
}
