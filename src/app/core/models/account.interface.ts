import {AccountType} from './account-type.enum';

export interface Account {
  id: string,
  userId: string,
  name: string,
  bank: string,
  number: string,
  balance: number,
  currency: string,
  type: AccountType,
  color: string,
}
