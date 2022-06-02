import { useState } from 'react';
import DataService from '../../src/firebase/Services';

export const badges = [
	{
		id: 1,
		image: '/assets/pseudodata/images/badge.png',
		name: 'Infant Steps',
		desc: 'This user has completed 5 tasks.',
		date: '23-Feb-2022',
	},
	{
		id: 2,
		image: '/assets/pseudodata/images/badge.png',
		name: 'Toddler Steps',
		desc: 'This user has completed 5 tasks.',
		date: '24-Feb-2022',
	},
	{
		id: 3,
		image: '/assets/pseudodata/images/badge.png',
		name: 'Preschool Steps',
		desc: 'This user has completed 5 tasks.',
		date: '25-Feb-2022',
	},
	{
		id: 4,
		image: '/assets/pseudodata/images/badge.png',
		name: 'Adolescent Steps',
		desc: 'This user has completed 5 tasks.',
		date: '26-Feb-2022',
	},
	{
		id: 5,
		image: '/assets/pseudodata/images/badge.png',
		name: 'Adult Steps',
		desc: 'This user has completed 5 tasks.',
		date: '27-Feb-2022',
	},
];

async function getBadges(id: any) {
	// let myData: any = [];
	// console.log('BadgesCollected: ' + badgesCollected);
	// badgesCollected.forEach(async (data: any) => {
	// 	try {
	// 		await DataService.getBadge(data).then((docSnap) => {
	// 			console.log('Getting ' + data + ' at badges collection');

	// 			if (docSnap.exists()) {
	// 				// console.log('Document data:', docSnap.data());
	// 				myData.push(docSnap.data());
	// 				console.log('myDataName: ');
	// 				console.log(docSnap.data().badgeName);
	// 				console.log(docSnap.data().badgeDesc);
	// 				console.log(docSnap.data().dateAcquired);
	// 			} else {
	// 				// doc.data() will be undefined in this case
	// 				console.log('No such document!');
	// 			}
	// 		});
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// });

	// console.log('myData: ');
	// console.log(myData);
	// return myData;
	try {
		await DataService.getBadge(id).then((docSnap) => {
			console.log('Getting ' + id + ' at badges collection');

			if (docSnap.exists()) {
				// console.log('Document data:', docSnap.data());
				// myData.push(docSnap.data());

				console.log('myDataName: ');
				console.log(docSnap.data().badgeName);
				console.log(docSnap.data().badgeDesc);
				console.log(docSnap.data().dateAcquired);
				return docSnap.data();
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		});
	} catch (e) {
		console.log(e);
	}
}

export default getBadges;
