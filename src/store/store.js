import { configureStore } from '@reduxjs/toolkit';
import petReducer from './petSlice';
import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    pets: petReducer,
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['pets/fetchPets/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.createdAt'],
        // Ignore these paths in the state
        ignoredPaths: ['pets.pets'],
      },
    }),
}); 