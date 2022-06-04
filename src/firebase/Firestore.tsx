import { firestore } from '../firebase-config';
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import userConverter from './User';
import eventOrgConverter from './EventOrganizer';
import rankConverter from './RankDetails';
import eventConverter from './EventDetails';

function StreamConnection() {
	const db = firestore;
	const userCol = collection(db, 'user');
	const eventOrgCol = collection(db, 'eventOrganizer');
	const eventsCol = collection(db, 'events');
	const ranksCol = collection(db, 'ranks');
	const achievementCol = collection(db, 'achievements');
	const badgesCol = collection(db, 'badges');

	//Functions to Read
	async function getUser(id: any) {
		const userRef = doc(db, userCol.toString(), id).withConverter(
			userConverter
		);
		const docSnap = await getDoc(userRef);
		if (docSnap.exists()) {
			const user = docSnap.data();
			console.log(user.toString());
			return user;
		} else {
			console.log('User Document Missing');
		}
	}

	async function getEventOrg(id: any) {
		const eventOrgRef = doc(db, eventOrgCol.toString(), id).withConverter(
			eventOrgConverter
		);
		const docSnap = await getDoc(eventOrgRef);
		if (docSnap.exists()) {
			const eventOrg = docSnap.data();
			console.log(eventOrg.toString());
			return eventOrg;
		} else {
			console.log('EventOrganizer Document Missing');
		}
	}

	async function getRank(id: any) {
		const rankRef = doc(db, ranksCol.toString(), id).withConverter(
			rankConverter
		);
		const docSnap = await getDoc(rankRef);
		if (docSnap.exists()) {
			const rank = docSnap.data();
			console.log(rank.toString());
			return rank;
		} else {
			console.log('Rank Document Missing');
		}
	}

	async function getEvent(id: any) {
		const eventRef = doc(db, eventsCol.toString(), id).withConverter(
			eventConverter
		);
		const docSnap = await getDoc(eventRef);
		if (docSnap.exists()) {
			const event = docSnap.data();
			console.log(event.toString());
			return event;
		} else {
			console.log('Event Document Missing');
		}
	}

	async function getSubCollection(collection: any) {
		const querySnapshot = await getDocs(collection);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, ' => ', doc.data());
			return doc.data;
		});
	}

	//Functions to Update
	//import converter functions here

	//Functions to Delete
	//import converter functions here
}

export default StreamConnection;

/*
//User Data created to Firestore
const newUser = {
			name: { first: firstName, last: lastName },
			rank: 'Spark',
			avatar: '',
			eventsJoined: [''],
			badgesCollected: [''],
			expTotal: 0,
		};
//Event Data created to Firestore
const newEvent = {
            eventCode: 'p00pDisaster',
            eventDate: Date('2022-05-06'),
            eventDesc: 'Everyone is tasked to clean up poops scattered on the streets.',
            eventImage: imageUrl.com,
            eventName: Poop Disaster,
            expReward: 50000,
            membersAllowed: 100,
			// quests: { quests: ['quest1', 'quest2'], expReward: 200, questCode: I<3U, questName: Gathering }, subcollection
			
		};

*/
