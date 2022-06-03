// import { useState, useEffect } from 'react';
// import DataService from '../../src/firebase/Services';
// import { auth } from '../../src/firebase-config';
// import { useAuthState } from 'react-firebase-hooks/auth';

// let badges: any = [
// 	// {
// 	// 	badgePic: '/assets/pseudodata/images/badge.png',
// 	// 	badgeName: 'Infant Steps',
// 	// 	badgeDesc: 'This user has completed 5 tasks.',
// 	// 	dateAcquired: '23-Feb-2022',
// 	// },
// 	// {
// 	// 	badgePic: '/assets/pseudodata/images/badge.png',
// 	// 	badgeName: 'Toddler Steps',
// 	// 	badgeDesc: 'This user has completed 5 tasks.',
// 	// 	dateAcquired: '24-Feb-2022',
// 	// },
// 	// {
// 	// 	badgePic: '/assets/pseudodata/images/badge.png',
// 	// 	badgeName: 'Preschool Steps',
// 	// 	badgeDesc: 'This user has completed 5 tasks.',
// 	// 	dateAcquired: '25-Feb-2022',
// 	// },
// 	// {
// 	// 	badgePic: '/assets/pseudodata/images/badge.png',
// 	// 	badgeName: 'Adolescent Steps',
// 	// 	badgeDesc: 'This user has completed 5 tasks.',
// 	// 	dateAcquired: '26-Feb-2022',
// 	// },
// 	// {
// 	// 	badgePic: '/assets/pseudodata/images/badge.png',
// 	// 	badgeName: 'Adult Steps',
// 	// 	badgeDesc: 'This user has completed 5 tasks.',
// 	// 	dateAcquired: '27-Feb-2022',
// 	// },
// ];

// // async function getBadges(id: any) {
// // 	// let myData: any = [];
// // 	// console.log('BadgesCollected: ' + badgesCollected);
// // 	// badgesCollected.forEach(async (data: any) => {
// // 	// 	try {
// // 	// 		await DataService.getBadge(data).then((docSnap) => {
// // 	// 			console.log('Getting ' + data + ' at badges collection');

// // 	// 			if (docSnap.exists()) {
// // 	// 				// console.log('Document data:', docSnap.data());
// // 	// 				myData.push(docSnap.data());
// // 	// 				console.log('myDataName: ');
// // 	// 				console.log(docSnap.data().badgeName);
// // 	// 				console.log(docSnap.data().badgeDesc);
// // 	// 				console.log(docSnap.data().dateAcquired);
// // 	// 			} else {
// // 	// 				// doc.data() will be undefined in this case
// // 	// 				console.log('No such document!');
// // 	// 			}
// // 	// 		});
// // 	// 	} catch (e) {
// // 	// 		console.log(e);
// // 	// 	}
// // 	// });

// // 	// console.log('myData: ');
// // 	// console.log(myData);
// // 	// return myData;
// // 	try {
// // 		await DataService.getBadge(id).then((docSnap) => {
// // 			console.log('Getting ' + id + ' at badges collection');

// // 			if (docSnap.exists()) {
// // 				// console.log('Document data:', docSnap.data());
// // 				// myData.push(docSnap.data());

// // 				console.log('myDataName: ');
// // 				console.log(docSnap.data().badgeName);
// // 				console.log(docSnap.data().badgeDesc);
// // 				console.log(docSnap.data().dateAcquired);
// // 				return docSnap.data();
// // 			} else {
// // 				// doc.data() will be undefined in this case
// // 				console.log('No such document!');
// // 			}
// // 		});
// // 	} catch (e) {
// // 		console.log(e);
// // 	}
// // }

// export default badges;
