import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAnimal } from '../../models/IAnimal';
import { RootState } from '../store';
import { Status } from '../../models/Status.enum';
import { AxiosResponse } from 'axios';
import AnimalService from '../../services/AnimalService';
import { message } from 'antd';
import { removeAnimalFromArea } from './allocationSlice';

export const fetchAnimals = createAsyncThunk<
  AxiosResponse<IAnimal[]>,
  void,
  { rejectValue: string }
>('animals/fetchAnimals', async (_, { rejectWithValue }) => {
  try {
    const response = await AnimalService.getAnimals();
    return response;
  } catch (error) {
    return rejectWithValue('Не получилось запросить список животных');
  }
});

export const createAnimal = createAsyncThunk<
  AxiosResponse<IAnimal>,
  IAnimal,
  { rejectValue: string }
>('animals/getAnimal', async (params, { rejectWithValue }) => {
  try {
    const response = await AnimalService.createAnimal(params);
    return response;
  } catch (error) {
    return rejectWithValue('Не получилось добавить животное');
  }
});

export const deleteAnimal = createAsyncThunk<
  IAnimal,
  IAnimal,
  { rejectValue: string; state: RootState }
>('animals/deleteAnimal', async (params, { rejectWithValue, getState, dispatch }) => {
  try {
    const state = getState() as RootState;
    await AnimalService.deleteAnimal(params);
    const indexOfArea = state.allocation.areas.findIndex(
      (area) => area.first?.id === params.id || area.second?.id === params.id,
    );
    const area = state.allocation.areas[indexOfArea];
    const pos = area.first?.id === params.id ? 'first' : 'second';
    dispatch(removeAnimalFromArea({ animal: pos, id: indexOfArea }));
    return params;
  } catch (error) {
    return rejectWithValue('Не получилось удалить животное');
  }
});

interface AnimalState {
  list: IAnimal[];
  status: Status;
  error: string | null;
}

const initialState: AnimalState = {
  list: [],
  status: Status.LOADING,
  error: null,
};

const animalSlice = createSlice({
  name: 'animalReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Запрос списка животных
    builder.addCase(fetchAnimals.pending, (state, action) => {
      state.status = Status.LOADING;
      state.list = initialState.list;
    });
    builder.addCase(fetchAnimals.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.list = action.payload.data.map((item) => ({ ...item, type: 'animal' }));
    });
    builder.addCase(fetchAnimals.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload || 'Не получилось запросить список животных';
    });
    // Создание животного
    builder.addCase(createAnimal.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(createAnimal.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.list.push({ ...action.payload.data, type: 'animal' });
    });
    builder.addCase(createAnimal.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload || 'Не получилось добавить животное';
    });
    // Удаление животного
    builder.addCase(deleteAnimal.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(deleteAnimal.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      const indexOfDeleted = state.list.findIndex((item) => item.id === action.payload.id);
      state.list.splice(indexOfDeleted, 1);
      message.success('Животное удалено');
    });
    builder.addCase(deleteAnimal.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload || 'Не получилось удалить животное';
    });
  },
});

export const SelectAnimals = (state: RootState) => state.animals;
export const {} = animalSlice.actions;

export default animalSlice.reducer;
