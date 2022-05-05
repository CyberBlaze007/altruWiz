import { firestore } from '../firebase-config';
import {
	collection,
	getDoc,
	setDoc,
	updateDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore';

//for user Collection crud
const userCollectionRef = collection(firestore, 'user');

class UserDataService {
	addUser = (newUser: any, id: string) => {
		return setDoc(doc(firestore, 'user', id), newUser);
	};

	getUser = (id: string) => {
		const userDoc = doc(firestore, 'user', id);
		return getDoc(userDoc);
	};

	updateUser = (id: string, updatedUser: any) => {
		const userDoc = doc(firestore, 'user', id);
		return updateDoc(userDoc, updatedUser);
	};

	deleteUser = (id: string) => {
		const userDoc = doc(firestore, 'user', id);
		return deleteDoc(userDoc);
	};
}

export default new UserDataService();
