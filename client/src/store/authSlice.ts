import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '../../../shared/types';

interface AuthState {
  user: Company | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: Company; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setUser: (state, action: PayloadAction<Company>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
});

export const { setCredentials, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
