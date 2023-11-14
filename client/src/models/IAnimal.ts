export interface IAnimal {
  id: number;
  name: string;
  predator: boolean | undefined;
  readonly type?: 'animal';
}
