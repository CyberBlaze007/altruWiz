import { firestore } from '../firebase-config';
import { getDoc, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

//for user Collection crud
const userCol = 'user';

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
}

export default new DataService();

// const eventOrgCol = collection(db, 'eventOrganizer');
// const eventsCol = collection(db, 'events');
// const ranksCol = collection(db, 'ranks');
// const achievementCol = collection(db, 'achievements');
// const badgesCol = collection(db, 'badges');
