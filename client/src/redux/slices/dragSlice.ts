import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface DragState {
  item: any | null;
}

const initialState: DragState = {
  item: null,
};

const dragSlice = createSlice({
  name: 'dragSlice',
  initialState,
  reducers: {
    setDragItem(state, action: PayloadAction<unknown>) {
      state.item = action.payload;
    },
    clearDragItem(state) {
      state.item = null;
    },
  },
});

export const SelectDragItem = (state: RootState) => state.drag.item;
export const { setDragItem, clearDragItem } = dragSlice.actions;

export default dragSlice.reducer;
