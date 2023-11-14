export interface IAnimal {
  id: number;
  name: string;
  predator: boolean | null | undefined;
  readonly type?: 'animal';
}
