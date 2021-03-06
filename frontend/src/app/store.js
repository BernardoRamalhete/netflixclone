import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import profileReducer from '../features/profiles/profileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profiles: profileReducer
  }
});
