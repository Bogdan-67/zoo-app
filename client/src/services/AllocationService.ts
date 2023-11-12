import { AxiosResponse } from 'axios';
import { IAllocation } from '../models/IAllocation';
import $api from '../http';
import { IArea } from '../models/IArea';

export default class AllocationSertvice {
  static async generateAllocation(): Promise<AxiosResponse<IAllocation>> {
    return $api.get<IAllocation>('/allocation/generate');
  }

  static async saveAllocation(areas: IArea[]): Promise<AxiosResponse<string>> {
    return $api.post<string>('/allocation', { areas });
  }
}
