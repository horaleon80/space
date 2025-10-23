import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectionState {
  selectedLaunchId: string | null;
  selectedRocketId: string | null;
}

const initialState: SelectionState = {
  selectedLaunchId: null,
  selectedRocketId: null,
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setSelectedLaunch: (state, action: PayloadAction<string | null>) => {
      state.selectedLaunchId = action.payload;
    },
    setSelectedRocket: (state, action: PayloadAction<string | null>) => {
      state.selectedRocketId = action.payload;
    },
    clearSelection: (state) => {
      state.selectedLaunchId = null;
      state.selectedRocketId = null;
    },
  },
});

export const { setSelectedLaunch, setSelectedRocket, clearSelection } = selectionSlice.actions;
export default selectionSlice.reducer;