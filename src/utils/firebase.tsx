import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY as string,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET as string,
	messagingSenderId: process.env
		.REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string,
	appId: process.env.REACT_APP_FIREBASE_APP_ID as string,
};

// инициализация только один раз
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// для совместимости оставляем заглушку
export function ensureFirebaseAdapter() {
	return Promise.resolve();
}
