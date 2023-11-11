import { IArea } from './IArea';

export interface IAllocation {
  id?: number;
  created_at?: Date;
  areas?: IArea[];
}
