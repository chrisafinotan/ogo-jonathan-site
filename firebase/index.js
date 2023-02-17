import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

if (!app) {
   throw new Error('Firebase application could not initialized!');
}

export const storage = getStorage(app);
