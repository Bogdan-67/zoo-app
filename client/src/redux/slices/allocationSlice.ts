import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IAllocation } from '../../models/IAllocation';
import AllocationSertvice from '../../services/AllocationService';
import { IArea } from '../../models/IArea';
import { Status } from '../../models/Status.enum';
import { message } from 'antd';
import { RootState } from '../store';

// Генерация распределения
export const generateAllocation = createAsyncThunk<
  AxiosResponse<IAllocation>,
  void,
  { rejectValue: string }
>('allocation/generateAllocation', async (_, { rejectWithValue }) => {
  try {
    const response = await AllocationSertvice.generateAllocation();
    return response;
  } catch (error) {
    return rejectWithValue('Не удалось сгенерировать распределение');
  }
});

interface AllocationState {
  areas: Partial<IArea>[];
  status: Status;
  error: string | null;
}

const initialState: AllocationState = {
  areas: [],
  status: Status.SUCCESS,
  error: null,
};

const allocationSlice = createSlice({
  name: 'allocationReducer',
  initialState,
  reducers: {
    setAreas(state, action: PayloadAction<number>) {
      const number = action.payload;
      console.log('number', number);
      let diff = number - state.areas.length;
      if (diff > 0) {
        [...new Array(diff)].map((_, index) =>
          state.areas.push({ id: Date.now() + index, first: null, second: null }),
        );
      } else if (diff < 0) {
        const emptyAreas = state.areas.filter(
          (area) => area.first === null && area.second === null,
        );
        if (emptyAreas.length > 0) {
          while (emptyAreas.length > 0 && diff < 0) {
            const area = emptyAreas.shift()!;
            const indexOfArea = state.areas.findIndex((item) => item.id === area.id);
            if (indexOfArea >= 0) state.areas.splice(indexOfArea, 1);
            diff++;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Генерация распределения
    builder.addCase(generateAllocation.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(generateAllocation.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      message.success('Распределение сгенерировано!');
      state.areas = action.payload.data.areas?.map((area, index) => ({ ...area, id: index })) || [];
    });
    builder.addCase(generateAllocation.rejected, (state, action) => {
      state.status = Status.ERROR;
      message.error(action.payload || 'Не удалось сгенерировать распределение');
    });
  },
});

export const SelectAreas = (state: RootState) => state.allocation.areas;
export const SelectAreasNumber = (state: RootState) => state.allocation.areas.length;
export const SelectAllocationStatus = (state: RootState) => state.allocation.status;
export const { setAreas } = allocationSlice.actions;

export default allocationSlice.reducer;
