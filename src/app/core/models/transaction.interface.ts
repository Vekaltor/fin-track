import {TransactionType} from './transaction-type.enum';

export interface TransactionInterface {
  id: string,
  accountId: string,
  userId: string,
  amount: number,
  type: TransactionType,
  category: string,
  description: string,
  date: string,
}
