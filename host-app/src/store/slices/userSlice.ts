import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  theme: 'light' | 'dark';
}

const initialState: UserState = {
  name: 'Guest',
  theme: 'light',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    logout: (state) => {
      state.name = 'Guest';
    },
  },
});

export const { setUser, toggleTheme, logout } = userSlice.actions;
export default userSlice.reducer;
