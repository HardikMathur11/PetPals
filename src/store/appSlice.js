import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isOnline: navigator.onLine,
    syncQueue: [],
    lastSync: null,
    showOfflineNotice: false
  },
  reducers: {
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
      state.showOfflineNotice = !action.payload;
    },
    addToSyncQueue: (state, action) => {
      state.syncQueue.push(action.payload);
    },
    clearSyncQueue: (state) => {
      state.syncQueue = [];
    },
    setLastSync: (state, action) => {
      state.lastSync = action.payload;
    },
    hideOfflineNotice: (state) => {
      state.showOfflineNotice = false;
    }
  }
});

export const { 
  setOnlineStatus, 
  addToSyncQueue, 
  clearSyncQueue, 
  setLastSync, 
  hideOfflineNotice 
} = appSlice.actions;

export default appSlice.reducer; 