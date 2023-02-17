import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';
import { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, 'assets');
// export const storageRef = ref(storage);
