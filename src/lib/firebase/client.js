import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { firebaseClientConfig } from './firebaseConfig.js';

const app =
    getApps().length > 0 ? getApp() : initializeApp(firebaseClientConfig);
const auth = getAuth(app);
const storage = getStorage(app);

if (process.env.NEXT_PUBLIC_APP_ENV === 'emulator') {
    console.log('------------ emulating ----------')
    const localhost = process.env.NEXT_PUBLIC_BASE
    const storageport = 9199;
    connectStorageEmulator(storage, localhost, storageport);
}

export { auth, storage };