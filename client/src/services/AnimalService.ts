import $api from '../http';
import { AxiosResponse } from 'axios';
import { IAnimal } from '../models/IAnimal';

export default class AnimalService {
  static async createAnimal(name: string, predator: boolean): Promise<AxiosResponse<IAnimal>> {
    return $api.post<IAnimal>('/animals', { name, predator });
  }

  static async getAnimals(): Promise<AxiosResponse<IAnimal[]>> {
    return $api.get<IAnimal[]>('/animals');
  }
}
