import { AxiosResponse } from 'axios';
import { IAllocation } from '../models/IAllocation';
import $api from '../http';

export default class AllocationSertvice {
  static async generateAllocation(): Promise<AxiosResponse<IAllocation>> {
    return $api.get<IAllocation>('/allocation/generate');
  }
}
