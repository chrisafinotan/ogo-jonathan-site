'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from '@/lib/firebase/auth';
import Cookies from 'js-cookie';

export const FirebaseAuthContext = createContext({});
export const useAuthContext = () => useContext(FirebaseAuthContext);

const getAuthToken = () => {
    return Cookies.get('firebaseIdToken');
};

const setAuthToken = (token) => {
    return Cookies.set('firebaseIdToken', token, { secure: true });
};

const removeAuthToken = () => {
    return Cookies.remove('firebaseIdToken');
};

export default function FirebaseAuthProviderClient({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (user) => {
            if (user) {
                const idToken = await user.getIdToken();
                setUser(user);
                setAuthToken(idToken);
            }
            if (!user) {
                setUser(null);
                removeAuthToken();
            }
        });
        return () => unsubscribe();
    }, []);
    return (
        <FirebaseAuthContext.Provider value={user}>
            {children}
        </FirebaseAuthContext.Provider>
    );
}
