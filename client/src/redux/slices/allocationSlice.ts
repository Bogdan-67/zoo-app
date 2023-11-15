import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IAllocation } from '../../models/IAllocation';
import AllocationSertvice from '../../services/AllocationService';
import { IArea } from '../../models/IArea';
import { Status } from '../../models/Status.enum';
import { message } from 'antd';
import { RootState } from '../store';
import { IAnimal } from '../../models/IAnimal';

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

// Сохранение распределения
export const saveAllocation = createAsyncThunk<
  AxiosResponse<string>,
  void,
  { rejectValue: string; state: RootState }
>('allocation/saveAllocation', async (params, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const areas = state.allocation.areas.filter((item) => item.first && item.second);
    const response = await AllocationSertvice.saveAllocation(areas);
    return response;
  } catch (error) {
    return rejectWithValue('Не удалось сохранить распределение');
  }
});

interface AllocationState {
  areas: IArea[];
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

    addAnimalInArea(state, action: PayloadAction<{ animal: IAnimal; id: number }>) {
      const animal = action.payload.animal;
      let area = state.areas.find((item) => item.id === action.payload.id);
      const notAnimalInAllocation = !state.areas.find(
        (item) => item.first?.id === animal.id || item.second?.id === animal.id,
      );
      if (area !== undefined && !(area.first && area.second) && notAnimalInAllocation) {
        if (area.first === null) {
          area.first = animal;
        } else if (area.second === null) {
          area.second = animal;
        }
        state.areas = state.areas.map((item) => (item.id === area!.id ? area! : item));
      }
    },

    removeAnimalFromArea(state, action: PayloadAction<{ animal: 'first' | 'second'; id: number }>) {
      let area = state.areas.find((item) => item.id === action.payload.id);
      if (area !== undefined) {
        area[action.payload.animal] = null;
        state.areas = state.areas.map((item) => (item.id === area!.id ? area! : item));
      }
    },

    clearAreas(state) {
      state.areas = initialState.areas;
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
    // Сохранение распределения
    builder.addCase(saveAllocation.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(saveAllocation.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      message.success(action.payload.data);
      state.areas = initialState.areas;
    });
    builder.addCase(saveAllocation.rejected, (state, action) => {
      state.status = Status.ERROR;
      message.error(action.payload || 'Не удалось сохранить распределение');
    });
  },
});

export const SelectAreas = (state: RootState) => state.allocation.areas;
export const SelectAreasNumber = (state: RootState) => state.allocation.areas.length;
export const SelectAllocationStatus = (state: RootState) => state.allocation.status;
export const { setAreas, clearAreas, addAnimalInArea, removeAnimalFromArea } =
  allocationSlice.actions;

export default allocationSlice.reducer;
