export const firebaseClientConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseAdminConfig = {
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    client_email: process.env.SECRET_CLIENT_EMAIL,
    private_key: process.env.SECRET_PRIVATE_KEY,
};