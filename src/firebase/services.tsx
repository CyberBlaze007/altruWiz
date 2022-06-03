import { firestore } from '../firebase-config';
import {
	getDoc,
	setDoc,
	updateDoc,
	deleteDoc,
	doc,
	getDocs,
	collection,
	query,
	where,
} from 'firebase/firestore';
import eventConverter from './EventDetails';
import badgesConverter from './BadgeDetails';
import achievementConverter from './Achievement';

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
		// return setDoc(
		// 	doc(firestore, eventCol, id).withConverter(eventConverter),
		// 	newEvent
		// );
		// with converter not yet working
		return setDoc(doc(firestore, eventCol, id), newEvent);
	};
	getEvent = (id: string) => {
		const eventDoc = doc(firestore, eventCol, id).withConverter(eventConverter);
		return getDoc(eventDoc);
	};
	async getEventList(collection: any) {
		const querySnapshot = await getDocs(collection);
		querySnapshot.forEach((doc) => {
			// console.log(doc.id, ' => ', doc.data());
			return doc.data;
		});
	}
	updateEvent = (updatedEvent: any, id: string) => {
		const eventDoc = doc(firestore, eventCol, id).withConverter(eventConverter);
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
		return setDoc(
			doc(firestore, badgeCol, id).withConverter(badgesConverter),
			newBadge
		);
	};
	getBadges = async (id: any) => {
		// const badgeDoc = doc(firestore, badgeCol, id).withConverter(
		// 	badgesConverter
		// );
		// const badgeDoc = doc(firestore, badgeCol, id);
		//baby steps n junior
		// console.log('id before: ');
		// console.log(id);
		const badgeList = new Array();
		id.forEach(async (id: any) => {
			// console.log('id after: ');
			// console.log(id);
			const q = query(
				collection(firestore, badgeCol),
				where('badgeName', '==', id)
			);

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log(doc.id, ' => ', doc.data());
				badgeList.push(doc.data());
			});
		});
		return badgeList;
	};

	async getBadgeList(collection: any) {
		const querySnapshot = await getDocs(collection);
		querySnapshot.forEach((doc) => {
			// console.log(doc.id, ' => ', doc.data());
			return doc.data;
		});
	}
	updateBadge = (updatedBadge: any, id: string) => {
		const badgeDoc = doc(firestore, badgeCol, id).withConverter(
			badgesConverter
		);
		return updateDoc(badgeDoc, updatedBadge);
	};
	deleteBadge = (id: string) => {
		const badgeDoc = doc(firestore, badgeCol, id);
		return deleteDoc(badgeDoc);
	};

	//For Achievements Section
	getAchievements = (id: string) => {
		const badgeDoc = doc(firestore, badgeCol, id).withConverter(
			achievementConverter
		);
		return getDoc(badgeDoc);
	};

	//TODO: Add quests CRUD
}

export default new DataService();
