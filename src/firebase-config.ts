import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyA03oMSzv8tqyOymF3Ocpa3lOrvfcQj4HY',
	// authDomain: '',
	projectId: 'altruwiz',
	// storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	// messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: '1:24616873117:web:ed897dea3fe3dcb738f874',
	// measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/*
REACT_APP_API_KEY=AIzaSyA03oMSzv8tqyOymF3Ocpa3lOrvfcQj4HY;
REACT_APP_AUTH_DOMAIN=altruwiz.firebaseapp.com;
REACT_APP_REACT_APP_PROJECT_ID=altruwiz;
REACT_APP_STORAGE_BUCKET=altruwiz.appspot.com;
REACT_APP_MESSAGING_SENDER_ID=24616873117;
REACT_APP_REACT_APP_APP_ID=1:24616873117:web:ed897dea3fe3dcb738f874;
REACT_APP_MEASUREMENT_ID=G-LJH38Y54GS;
*/
