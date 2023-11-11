import { IAllocation } from './IAllocation';
import { IAnimal } from './IAnimal';
import { IPair } from './IPair';

export interface IArea {
  id: number;
  first?: IAnimal;
  second?: IAnimal;
  pair?: IPair;
  allocation?: IAllocation;
}
