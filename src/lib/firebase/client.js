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

// export async function getAuthenticatedAppForUser() {
//     if (typeof window !== 'undefined') {
//         return { app, currentUser: auth.currentUser?.toJSON() };
//     }

//     const { adminAuth } = customInitApp();
//     const noAuthReturn = { app: null, currentUser: null };
//     const authToken = await getAuthToken();

//     if (!authToken) return noAuthReturn;
//     const user = await adminAuth.verifyIdToken(authToken);
//     if (!user) return noAuthReturn;

//     return { app, currentUser: user };
// }

async function getAuthToken() {
    const { cookies } = await import('next/headers');
    try {
        const cookieStore = cookies();
        console.log('cookies', cookieStore.getAll());
        return cookieStore.get('firebaseIdToken')?.value;
    } catch (error) {
        return undefined;
    }
}
