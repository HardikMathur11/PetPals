import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOnlineStatus } from '../store/appSlice';
import { fetchPets, syncOfflineData, initializeFromCache } from '../store/petSlice';
import { firebaseUtils } from '../utils/firebase';

const ReduxOfflineIndicator = () => {
  const dispatch = useDispatch();
  const { isOnline, showOfflineNotice } = useSelector(state => state.app);
  const { loading } = useSelector(state => state.pets);
  const [syncQueueLength, setSyncQueueLength] = useState(0);

  // Check sync queue length
  useEffect(() => {
    const checkSyncQueue = () => {
      const syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
      setSyncQueueLength(syncQueue.length);
    };

    checkSyncQueue();
    const interval = setInterval(checkSyncQueue, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOnline = async () => {
      console.log('Going online...');
      dispatch(setOnlineStatus(true));
      
      // Wait a bit before enabling Firebase
      setTimeout(async () => {
        // Enable Firebase network
        await firebaseUtils.enableFirebaseNetwork();
        
        // Sync offline data when coming back online
        if (syncQueueLength > 0) {
          dispatch(syncOfflineData());
        }
        dispatch(fetchPets());
      }, 1000);
    };

    const handleOffline = async () => {
      console.log('Going offline...');
      dispatch(setOnlineStatus(false));
      
      // Immediately clear listeners and disable Firebase
      firebaseUtils.clearAllListeners();
      await firebaseUtils.disableFirebaseNetwork();
      
      // Initialize from cache when going offline
      dispatch(initializeFromCache());
    };

    // Set initial online status
    const initialOnlineStatus = navigator.onLine;
    dispatch(setOnlineStatus(initialOnlineStatus));
    
    // If initially offline, disable Firebase
    if (!initialOnlineStatus) {
      firebaseUtils.clearAllListeners();
      firebaseUtils.disableFirebaseNetwork();
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      // Clean up listeners on unmount
      firebaseUtils.clearAllListeners();
    };
  }, [dispatch, syncQueueLength]);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 z-50">
      <div className="flex items-center justify-center space-x-2">
        <span className="text-sm font-semibold">
          🔌 You're offline - Some features may be limited
        </span>
        {syncQueueLength > 0 && (
          <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
            {syncQueueLength} pending sync
          </span>
        )}
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
        )}
      </div>
    </div>
  );
};

export default ReduxOfflineIndicator; 