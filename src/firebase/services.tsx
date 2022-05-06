import { firestore as db } from '../firebase-config';
import {
	collection,
	getDoc,
	setDoc,
	updateDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore';

//for user Collection crud
const userCol = collection(db, 'user');
const eventOrgCol = collection(db, 'eventOrganizer');
const eventsCol = collection(db, 'events');
const ranksCol = collection(db, 'ranks');
const achievementCol = collection(db, 'achievements');
const badgesCol = collection(db, 'badges');
class UserDataService {
	addUser = (newUser: any, id: string) => {
		return setDoc(doc(db, userCol.toString(), id), newUser);
	};

	getUser = (id: string) => {
		const userDoc = doc(db, userCol.toString(), id);
		return getDoc(userDoc);
	};

	updateUser = (id: string, updatedUser: any) => {
		const userDoc = doc(db, userCol.toString(), id);
		return updateDoc(userDoc, updatedUser);
	};

	deleteUser = (id: string) => {
		const userDoc = doc(db, userCol.toString(), id);
		return deleteDoc(userDoc);
	};
}

export default new UserDataService();
