import { IAnimal } from './IAnimal';

export interface IPair {
  id: number;
  first: IAnimal;
  second: IAnimal;
  count: number;
}
