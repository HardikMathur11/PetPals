import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, firebaseUtils } from '../utils/firebase';

// Helper function to check if we're online
const isOnline = () => navigator.onLine;

// Async thunk for fetching pets
export const fetchPets = createAsyncThunk(
  'pets/fetchPets',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Always try to get cached data first
      const cachedPets = localStorage.getItem('cachedPets');
      const cachedData = cachedPets ? JSON.parse(cachedPets) : [];
      
      if (!isOnline()) {
        console.log('Offline - returning cached data');
        return cachedData;
      }

      // Check if Firebase is available
      if (!firebaseUtils.isFirebaseAvailable()) {
        console.log('Firebase not available - returning cached data');
        return cachedData;
      }

      // Online: Try to fetch from Firebase with timeout
      const pets = await Promise.race([
        firebaseUtils.safeFirebaseCall(async () => {
          const querySnapshot = await getDocs(collection(db, "pets"));
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase timeout')), 5000)
        )
      ]);
      
      // Cache the fresh data
      localStorage.setItem('cachedPets', JSON.stringify(pets));
      localStorage.setItem('petsLastUpdated', Date.now());
      
      return pets;
    } catch (error) {
      console.error('Error fetching pets:', error);
      
      // Return cached data if available, otherwise empty array
      const cachedPets = localStorage.getItem('cachedPets');
      if (cachedPets) {
        console.log('Using cached data due to fetch error');
        return JSON.parse(cachedPets);
      }
      
      return rejectWithValue('Failed to fetch pets and no cached data available');
    }
  }
);

// Async thunk for adding a pet
export const addPet = createAsyncThunk(
  'pets/addPet',
  async (petData, { getState, rejectWithValue }) => {
    try {
      if (!isOnline()) {
        // Offline: Save to localStorage and queue for sync
        const offlinePet = {
          id: `offline_${Date.now()}`,
          ...petData,
          createdAt: { seconds: Date.now() / 1000 },
          isOffline: true
        };
        
        // Save to localStorage
        const cachedPets = JSON.parse(localStorage.getItem('cachedPets') || '[]');
        cachedPets.push(offlinePet);
        localStorage.setItem('cachedPets', JSON.stringify(cachedPets));
        
        // Queue for sync when online
        const syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
        syncQueue.push({ type: 'ADD_PET', data: petData });
        localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
        
        return offlinePet;
      }

      // Check if Firebase is available
      if (!firebaseUtils.isFirebaseAvailable()) {
        throw new Error('Firebase not available');
      }

      // Online: Save to Firebase with timeout
      const newPet = await Promise.race([
        firebaseUtils.safeFirebaseCall(async () => {
          const docRef = await addDoc(collection(db, "pets"), {
            ...petData,
            createdAt: serverTimestamp(),
          });
          return { id: docRef.id, ...petData };
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase timeout')), 5000)
        )
      ]);
      
      return newPet;
    } catch (error) {
      console.error('Error adding pet:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a pet
export const updatePet = createAsyncThunk(
  'pets/updatePet',
  async ({ id, petData }, { getState, rejectWithValue }) => {
    try {
      if (!isOnline()) {
        // Offline: Update in localStorage and queue for sync
        const cachedPets = JSON.parse(localStorage.getItem('cachedPets') || '[]');
        const updatedPets = cachedPets.map(pet => 
          pet.id === id ? { ...pet, ...petData, isOffline: true } : pet
        );
        localStorage.setItem('cachedPets', JSON.stringify(updatedPets));
        
        // Queue for sync
        const syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
        syncQueue.push({ type: 'UPDATE_PET', id, data: petData });
        localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
        
        return { id, ...petData };
      }

      // Check if Firebase is available
      if (!firebaseUtils.isFirebaseAvailable()) {
        throw new Error('Firebase not available');
      }

      // Online: Update in Firebase with timeout
      await Promise.race([
        firebaseUtils.safeFirebaseCall(async () => {
          await updateDoc(doc(db, "pets", id), petData);
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase timeout')), 5000)
        )
      ]);
      
      return { id, ...petData };
    } catch (error) {
      console.error('Error updating pet:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for syncing offline data
export const syncOfflineData = createAsyncThunk(
  'pets/syncOfflineData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (!isOnline()) {
        throw new Error('Cannot sync while offline');
      }

      if (!firebaseUtils.isFirebaseAvailable()) {
        throw new Error('Firebase not available for sync');
      }

      const syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
      
      for (const item of syncQueue) {
        try {
          if (item.type === 'ADD_PET') {
            await Promise.race([
              firebaseUtils.safeFirebaseCall(async () => {
                await addDoc(collection(db, "pets"), {
                  ...item.data,
                  createdAt: serverTimestamp(),
                });
              }),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Firebase timeout')), 5000)
              )
            ]);
          } else if (item.type === 'UPDATE_PET') {
            await Promise.race([
              firebaseUtils.safeFirebaseCall(async () => {
                await updateDoc(doc(db, "pets", item.id), item.data);
              }),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Firebase timeout')), 5000)
              )
            ]);
          }
        } catch (error) {
          console.error('Sync error for item:', item, error);
        }
      }
      
      // Clear sync queue after successful sync
      localStorage.removeItem('syncQueue');
      
      // Refresh pets data
      dispatch(fetchPets());
      
      return { synced: true };
    } catch (error) {
      console.error('Sync error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const petSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    loading: false,
    error: null,
    lastUpdated: null
  },
  reducers: {
    setPets: (state, action) => {
      state.pets = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    initializeFromCache: (state) => {
      const cachedPets = localStorage.getItem('cachedPets');
      if (cachedPets) {
        state.pets = JSON.parse(cachedPets);
        state.lastUpdated = Date.now();
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch pets';
        // Try to load from cache on error
        const cachedPets = localStorage.getItem('cachedPets');
        if (cachedPets) {
          state.pets = JSON.parse(cachedPets);
        }
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.pets.push(action.payload);
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        const index = state.pets.findIndex(pet => pet.id === action.payload.id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
      });
  }
});

export const { setPets, clearError, initializeFromCache } = petSlice.actions;
export default petSlice.reducer; 