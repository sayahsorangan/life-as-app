import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  themePreference: ThemeMode;
}

const initialState: ThemeState = {
  themePreference: 'system',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemePreference: (state, action: PayloadAction<ThemeMode>) => {
      state.themePreference = action.payload;
    },
  },
});

export const {setThemePreference} = themeSlice.actions;
export default themeSlice.reducer;
