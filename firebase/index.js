import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

let storage = null;
let app = null;

if (process.env.NEXT_ENV === 'production') {
   app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
   if (!app) {
      throw new Error('Firebase application could not initialized!');
   }

   storage = getStorage(app);
   if (!storage) {
      throw new Error('Firebase storage could not initialized!');
   }
}
export default storage;
