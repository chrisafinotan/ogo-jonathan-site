'use client';

import { useContext } from 'react';
import { signInWithGoogle, signOut } from '@/lib/firebase/auth';
import { FirebaseAuthContext } from '@/site/FirebaseAuthProvider';

export const GoogleLogin = () => {
    const user = useContext(FirebaseAuthContext);
    const handleSignOut = (event) => {
        event.preventDefault();
        signOut();
    };
    const handleSignIn = (event) => {
        event.preventDefault();
        signInWithGoogle();
    };

    return (
        <>
            {user ? (
                <div className='profile'>
                    <p>{user.displayName}</p>
                    <a href='#' onClick={handleSignOut}>
                        Sign Out
                    </a>
                </div>
            ) : (
                <a href='#' onClick={handleSignIn}>
                    Sign In with Google
                </a>
            )}
        </>
    );
};
