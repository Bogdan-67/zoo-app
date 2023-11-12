import { IAllocation } from './IAllocation';
import { IAnimal } from './IAnimal';
import { IPair } from './IPair';

export interface IArea {
  id: number;
  first?: IAnimal | null;
  second?: IAnimal | null;
  pair?: IPair | null;
  allocation?: IAllocation;
}
