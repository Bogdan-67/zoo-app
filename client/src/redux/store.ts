import { configureStore } from '@reduxjs/toolkit';
import animals from './slices/animalSlice';
import allocation from './slices/allocationSlice';
import drag from './slices/dragSlice';

export const store = configureStore({
  reducer: {
    animals,
    allocation,
    drag,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
