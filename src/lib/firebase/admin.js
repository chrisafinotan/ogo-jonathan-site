import { initializeApp, getApps, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const getInitializedApp = () => {
    const adminApp = getApps()[0];
    const adminAuth = getAuth(adminApp);
    return { adminApp, adminAuth };
};

export function customInitApp() {
    const adminApps = getApps();
    if (adminApps.length <= 0) {
        if (process.env.NEXT_PUBLIC_APP_ENV === 'emulator') {
            const localhost = process.env.NEXT_PUBLIC_BASE;
            const storageport = 9199;
            process.env[
                'STORAGE_EMULATOR_HOST'
            ] = `${localhost}:${storageport}`;
        }
        initializeApp({
            credential: applicationDefault(),
        });
    }
    return getInitializedApp();
}
