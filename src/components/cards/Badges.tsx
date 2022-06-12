import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase-config';
import DataService from '../../firebase/services';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

function Badges(check: any) {
	const [badgeDetails, setBadgeDetails]: any = useState([]);
	const [isUpdated, setIsUpdated] = useState(false);
	const [user, loading] = useAuthState(auth);
	check && (check = user);

	useEffect(() => {
		onSnapshot(
			query(collection(firestore, 'user'), where('email', '==', user.email)),
			(snapshot) => {
				getBadgeDetails(snapshot.docs.at(0).data().badgesCollected);
				awardBadges(
					snapshot.docs.at(0).data().badgesCollected,
					snapshot.docs.at(0).data().eventsCompleted
				);
			}
		);
	}, [loading, isUpdated]);

	const getBadgeDetails = async (badgeList: any) => {
		let finalBadges: any = [];
		await DataService.getBadges().then((result) => {
			badgeList.forEach((id: any) => {
				finalBadges.push(result.find((item: any) => item.id === id));
			});
			setBadgeDetails(finalBadges);
			setIsUpdated(true);
		});
	};

	const awardBadges = async (badgesCollected: any, eventsJoined: any) => {
		let newBadges = badgesCollected;
		let checkJ = true;
		let checkB = true;
		let checkL = true;

		if (eventsJoined.length >= 1) {
			badgesCollected.forEach((badge: any) => {
				checkB = checkB && badge !== 'Baby Steps';
				// console.log('badge === Baby steps', badge, checkB);
			});
			checkB && newBadges.push('Baby Steps');
		}
		if (eventsJoined.length >= 5) {
			badgesCollected.forEach((badge: any) => {
				checkJ = checkJ && badge !== 'Junior Steps';
				// console.log('badge === Junior steps', badge, checkJ);
			});

			checkJ && newBadges.push('Junior Steps');
		}
		if (eventsJoined.length >= 10) {
			badgesCollected.forEach((badge: any) => {
				checkL = checkL && badge !== 'Love Thumb';
				// console.log('badge === Love Thumb', badge, checkL);
			});

			checkL && newBadges.push('Love Thumb');
		}
		(checkL || checkJ || checkB) &&
			(await DataService.updateUser(
				{
					badgesCollected: newBadges,
				},
				user.uid
			));
	};

	return (
		<div className='badges'>
			<div className='badges-list'>
				{badgeDetails.map((data: any, index: number) => {
					return data ? (
						<div key={index} className='badges-list-card'>
							<div className='badges-list-card-overlay'>
								<img src={data.badgePic} />
								<div className='badges-list-card-overlay-details'>
									<h1 className='badges-list-card-overlay-details-name'>
										{data.badgeName}
									</h1>
									<h1 className='badges-list-card-overlay-details-desc'>
										{data.badgeDesc}
									</h1>
									<div className='badges-list-card-overlay-details-date'>
										<h1 className='badges-list-card-overlay-details-date-text1'>
											{data.dateAcquired}
										</h1>
										<h1 className='badges-list-card-overlay-details-date-text2'>
											DATE ACQUIRED
										</h1>
									</div>
								</div>
							</div>
						</div>
					) : (
						<h1>No badges yet</h1>
					);
				})}
			</div>
		</div>
	);
}

export default Badges;
