import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAnimal } from '../../models/IAnimal';
import { RootState } from '../store';
import { Status } from '../../models/Status.enum';
import { AxiosResponse } from 'axios';
import AnimalService from '../../services/AnimalService';

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
  },
});

export const SelectAnimals = (state: RootState) => state.animals;
export const {} = animalSlice.actions;

export default animalSlice.reducer;
