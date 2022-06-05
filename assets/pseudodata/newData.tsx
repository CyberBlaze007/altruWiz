import { useEffect, useState } from 'react';
import useAuthState from 'react-firebase-hooks/auth/dist/auth/useAuthState';
import { auth } from '../../src/firebase-config';
import DataService from '../../src/firebase/services';

function newData() {
	//Make Organization Data
	const [orgName, setOrgName] = useState('');
	const [orgAbout, setOrgAbout] = useState('');
	const [orgCreator, setCreator] = useState('USER EMAIL');

	const makeOrg = async () => {
		const newOrg = {
			orgName: orgName,
			orgAbout: orgAbout,
			creator: orgCreator,
			eventsCreated: [''],
		};
		try {
			await DataService.addOrg(newOrg, '');
		} catch (error) {
			console.log(error);
		}
	};

	//Make Event Data
	const [eventCode, setEventCode] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [eventDesc, setEventDesc] = useState('');
	const [eventImage, setEventImage] = useState('');
	const [eventName, setEventName] = useState('');
	const [expReward, setExpReward] = useState('');
	const [membersAllowed, setMembersAllowed] = useState('');

	const makeEvent = async () => {
		const newEvent = {
			attendCount: 0,
			eventCode: eventCode,
			eventDate: eventDate,
			eventDesc: eventDesc,
			eventImage: eventImage,
			eventName: eventName,
			expReward: expReward,
			membersAllowed: membersAllowed,
		};
		try {
			await DataService.addEvent(newEvent, '');
		} catch (error) {
			console.log(error);
		}
	};

	//Ranks Data
	const [expNeeded, setExpNeeded] = useState('');
	const [rankDesc, setRankDesc] = useState('');
	const [rankName, setRankName] = useState('');
	const [rankPic, setRankPic] = useState('');
	const [user] = useAuthState(auth);
	useEffect(() => {
		getCurrentRank();
	}, []);

	const rankID = {
		Spark: 'spark', //1
		'Growing Ember': 'growingEmber', //2
		'Walking Essence': 'walkingEssence', //3
		'Kindled Soul': 'kindledSoul', //4
		'Manifested Spirit': 'manifestedSpirit', //5
		'Profound Mind': 'profoundMind', //6
		'Zealot Body': 'zealotBody', //7
		'Altruist Sage': 'altruistSage', //8
		'Proxima Singula': 'proximaSingula', //9
	};
	const getCurrentRank = async () => {
		await DataService.getRank(rankID['Spark']).then((docSnap: any) => {
			console.log(user.uid);
			if (docSnap.exists()) {
				// console.log('Document data:', docSnap.data());
				const myData = docSnap.data();
				setExpNeeded(myData.expNeeded);
				setRankDesc(myData.rankDesc);
				setRankName(myData.rankName);
				setRankPic(myData.rankPic);
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		});
	};

	return <div>newData</div>;
}

export default newData;
