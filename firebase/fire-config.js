import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
// const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider(
//         "abcdefghijklmnopqrstuvwxy-1234567890abcd"
//     ),

//     // Optional argument. If true, the SDK automatically refreshes App Check
//     // tokens as needed.
//     isTokenAutoRefreshEnabled: true,
// });

const projectDB = getFirestore(app);
const projectStorage = getStorage();

export { projectDB, projectStorage };
