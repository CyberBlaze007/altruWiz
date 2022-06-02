import { async } from '@firebase/util';
import { ConstructionOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import getBadges, { badges } from '../../../assets/pseudodata/badges';
import { auth } from '../../firebase-config';
import DataService from '../../firebase/Services';
import { debounce } from 'lodash';

function Badges() {
	const [user, loading] = useAuthState(auth);
	const [obtained, setObtained] = useState(false);
	const [myBadgeName, setMyBadgeName] = useState('');
	const [myBadgeDesc, setMyBadgeDesc] = useState('');
	const [myBadgePic, setMyBadgePic] = useState('');
	const [myDateAcquired, setMyDateAcquired] = useState('');
	const [badgeIDs, setBadgeIDs]: any = useState(new Array());

	const getCurrentBadges = debounce(async () => {
		await DataService.getUser(user.uid).then((docSnap) => {
			try {
				// const myData = docSnap.data();
				// setMyBadges(myData.badgesCollected);
				// console.log(myBadges);
				setBadgeIDs(docSnap.data().badgesCollected);
				// setMyData(getBadges(docSnap.data().badgesCollected));

				// console.log('MyData Current: ');
				// console.log(myData);
				badgeIDs.map(async (id: any) => {
					try {
						await DataService.getBadge(id).then((docSnap) => {
							console.log('Getting ' + id + ' at badges collection');

							if (docSnap.exists()) {
								// console.log('Document data:', docSnap.data());
								// myData.push(docSnap.data());

								const data = docSnap.data();
								console.log('myDataName: ');
								setMyBadgeName(data.badgeName);
								setMyBadgeDesc(data.badgeDesc);
								setMyBadgePic(data.badgePic);
								setMyDateAcquired(data.dateAcquired);
							} else {
								// doc.data() will be undefined in this case
								console.log('No such document!');
							}
							setObtained(true);
							console.log('obtained: ' + obtained);
						});
					} catch (e) {
						console.log(e);
					}
				});
			} catch (e) {
				console.log(e);
			}
		});
	}, 100);

	useEffect(() => {
		getCurrentBadges();
		return () => {
			getCurrentBadges();
		};
	}, [loading]);

	return (
		<div className='badges'>
			<div className='badges-list'>
				{obtained &&
					badgeIDs.map(() => {
						return (
							<div className='badges-list-card'>
								<div className='badges-list-card-overlay'>
									<img src={myBadgePic} />
									<div className='badges-list-card-overlay-details'>
										<h1 className='badges-list-card-overlay-details-name'>
											{myBadgeName}
										</h1>
										<h1 className='badges-list-card-overlay-details-desc'>
											{myBadgeDesc}
										</h1>
										<div className='badges-list-card-overlay-details-date'>
											<h1 className='badges-list-card-overlay-details-date-text1'>
												{myDateAcquired.toString()}
											</h1>
											<h1 className='badges-list-card-overlay-details-date-text2'>
												DATE ACQUIRED
											</h1>
										</div>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default Badges;
