import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork, onSnapshot, collection } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA8GUZNH1o326lKCo_-m3gI3aDi7EwEQQ",
  authDomain: "pet-registration-app.firebaseapp.com",
  projectId: "pet-registration-app",
  storageBucket: "pet-registration-app.firebasestorage.app",
  messagingSenderId: "916479177600",
  appId: "1:916479177600:web:cccdd707e16834be360765"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore with offline persistence
const db = getFirestore(app);

// Track active listeners
let activeListeners = new Set();

// Firebase utilities for offline handling
export const firebaseUtils = {
  // Check if Firebase is available
  isFirebaseAvailable: () => {
    try {
      return navigator.onLine && db && auth;
    } catch (error) {
      console.error('Firebase availability check failed:', error);
      return false;
    }
  },

  // Safely execute Firebase operations
  safeFirebaseCall: async (operation) => {
    if (!navigator.onLine) {
      throw new Error('Offline - cannot access Firebase');
    }
    
    try {
      return await operation();
    } catch (error) {
      console.error('Firebase operation failed:', error);
      throw error;
    }
  },

  // Enable/disable Firebase network
  enableFirebaseNetwork: async () => {
    try {
      await enableNetwork(db);
      console.log('Firebase network enabled');
    } catch (error) {
      console.error('Failed to enable Firebase network:', error);
    }
  },

  disableFirebaseNetwork: async () => {
    try {
      // Clear all active listeners first
      this.clearAllListeners();
      
      await disableNetwork(db);
      console.log('Firebase network disabled');
    } catch (error) {
      console.error('Failed to disable Firebase network:', error);
    }
  },

  // Add listener to tracking
  addListener: (unsubscribe) => {
    activeListeners.add(unsubscribe);
  },

  // Remove listener from tracking
  removeListener: (unsubscribe) => {
    activeListeners.delete(unsubscribe);
  },

  // Clear all active listeners
  clearAllListeners: () => {
    console.log('Clearing all Firebase listeners...');
    activeListeners.forEach(unsubscribe => {
      try {
        unsubscribe();
      } catch (error) {
        console.error('Error unsubscribing listener:', error);
      }
    });
    activeListeners.clear();
  },

  // Safe listener creation
  createSafeListener: (collectionRef, callback) => {
    if (!navigator.onLine) {
      console.log('Offline - not creating Firebase listener');
      return () => {}; // Return empty unsubscribe function
    }

    try {
      const unsubscribe = onSnapshot(collectionRef, callback, (error) => {
        console.error('Firebase listener error:', error);
        // Don't throw error, just log it
      });

      this.addListener(unsubscribe);
      return unsubscribe;
    } catch (error) {
      console.error('Failed to create Firebase listener:', error);
      return () => {}; // Return empty unsubscribe function
    }
  }
};

export { auth, db };