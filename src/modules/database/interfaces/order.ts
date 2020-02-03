import { IUser } from './user';

export interface IOrder {
  id?: number;
  userId: number;
  amount: number;
  value: number;
  description: string;

  user?: IUser;
}
