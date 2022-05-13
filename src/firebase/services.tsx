import { firestore } from '../firebase-config';
import { getDoc, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

//for user Collection crud
const userCol = 'user';
const orgCol = 'organizations';
const eventCol = 'events';
const rankCol = 'ranks';
const badgeCol = 'badges';

class DataService {
	//User CRUD
	addUser = (newUser: any, id: string) => {
		return setDoc(doc(firestore, userCol, id), newUser);
	};
	getUser = (id: string) => {
		const userDoc = doc(firestore, userCol, id);
		return getDoc(userDoc);
	};
	updateUser = (updatedUser: any, id: string) => {
		const userDoc = doc(firestore, userCol, id);
		return updateDoc(userDoc, updatedUser);
	};
	deleteUser = (id: string) => {
		const userDoc = doc(firestore, userCol, id);
		return deleteDoc(userDoc);
	};

	//Events CRUD
	addEvent = (newEvent: any, id: string) => {
		return setDoc(doc(firestore, eventCol, id), newEvent);
	};
	getEvent = (id: string) => {
		const eventDoc = doc(firestore, eventCol, id);
		return getDoc(eventDoc);
	};
	updateEvent = (updatedEvent: any, id: string) => {
		const eventDoc = doc(firestore, eventCol, id);
		return updateDoc(eventDoc, updatedEvent);
	};
	deleteEvent = (id: string) => {
		const eventDoc = doc(firestore, eventCol, id);
		return deleteDoc(eventDoc);
	};
}

export default new DataService();

// const eventOrgCol = collection(db, 'eventOrganizer');
// const eventsCol = collection(db, 'events');
// const ranksCol = collection(db, 'ranks');
// const achievementCol = collection(db, 'achievements');
// const badgesCol = collection(db, 'badges');
