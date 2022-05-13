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

	//Organizations CRUD
	addOrg = (newOrg: any, id: string) => {
		return setDoc(doc(firestore, orgCol, id), newOrg);
	};
	getOrg = (id: string) => {
		const orgDoc = doc(firestore, orgCol, id);
		return getDoc(orgDoc);
	};
	updateOrg = (updatedOrg: any, id: string) => {
		const orgDoc = doc(firestore, orgCol, id);
		return updateDoc(orgDoc, updatedOrg);
	};
	deleteOrg = (id: string) => {
		const orgDoc = doc(firestore, orgCol, id);
		return deleteDoc(orgDoc);
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

	//Ranks CRUD
	addRank = (newRank: any, id: string) => {
		return setDoc(doc(firestore, rankCol, id), newRank);
	};
	getRank = (id: string) => {
		const rankDoc = doc(firestore, rankCol, id);
		return getDoc(rankDoc);
	};
	updateRank = (updatedRank: any, id: string) => {
		const rankDoc = doc(firestore, rankCol, id);
		return updateDoc(rankDoc, updatedRank);
	};
	deleteRank = (id: string) => {
		const rankDoc = doc(firestore, rankCol, id);
		return deleteDoc(rankDoc);
	};

	//Badges CRUD
	addBadge = (newBadge: any, id: string) => {
		return setDoc(doc(firestore, badgeCol, id), newBadge);
	};
	getBadge = (id: string) => {
		const badgeDoc = doc(firestore, badgeCol, id);
		return getDoc(badgeDoc);
	};
	updateBadge = (updatedBadge: any, id: string) => {
		const badgeDoc = doc(firestore, badgeCol, id);
		return updateDoc(badgeDoc, updatedBadge);
	};
	deleteBadge = (id: string) => {
		const badgeDoc = doc(firestore, badgeCol, id);
		return deleteDoc(badgeDoc);
	};
}

export default new DataService();
