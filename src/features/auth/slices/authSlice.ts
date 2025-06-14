import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserMeResponse } from '../types/authTypes';

interface AuthState {
  user: UserMeResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isLoggingOut: boolean; 
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isLoggingOut: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<UserMeResponse>) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutStart(state) { 
      state.isLoggingOut = true;
    },
    logoutSuccess(state) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.isLoggingOut = false; 
    },
    setUser(state, action: PayloadAction<UserMeResponse | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
