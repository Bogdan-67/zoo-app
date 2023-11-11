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
      state.list = action.payload.data;
    });
    builder.addCase(fetchAnimals.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload || 'Не получилось запросить список животных';
    });
  },
});

export const SelectAnimals = (state: RootState) => state.animals;
export const {} = animalSlice.actions;

export default animalSlice.reducer;
