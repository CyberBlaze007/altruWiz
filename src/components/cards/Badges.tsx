import { useEffect, useState, useContext } from 'react';
import { firestore } from '../../firebase-config';
import DataService from '../../firebase/services';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { UserContext } from '../../App';

function Badges() {
	const [badgeDetails, setBadgeDetails]: any = useState([]);
	const [isUpdated, setIsUpdated] = useState(false);
	const [userBadges, setUserBadges]: any = useState([]);
	const user = useContext(UserContext);
	const date = Date.now();

	useEffect(() => {
		user &&
			onSnapshot(
				query(collection(firestore, 'user'), where('email', '==', user.email)),
				(snapshot) => {
					getBadgeDetails(snapshot.docs.at(0).data().badgesCollected);
					setUserBadges(snapshot.docs.at(0).data().badgesCollected);

					awardBadges(
						snapshot.docs.at(0).data().badgesCollected,
						snapshot.docs.at(0).data().completedEvents
					);
				}
			);
	}, [isUpdated]);

	const getBadgeDetails = async (badgeList: any) => {
		let finalBadges: any = [];
		await DataService.getBadges().then((result) => {
			badgeList.forEach((data: any) => {
				finalBadges.push(result.find((item: any) => item.id === data.badge));
			});
			setBadgeDetails(finalBadges);
			setIsUpdated(true);
		});
	};

	const awardBadges = async (badgesCollected: any, eventsCompleted: any) => {
		let newBadges = badgesCollected;
		let tempBadges = [];
		let checkJ = true;
		let checkB = true;
		let checkL = true;

		if (eventsCompleted.length >= 1) {
			badgesCollected.forEach((data: any) => {
				checkB = checkB && data.badge !== 'Baby Steps';
				// console.log('badge === Baby steps', data.badge, checkB);
			});
			checkB &&
				tempBadges.push({
					badge: 'Baby Steps',
					date: date,
				});
		}
		if (eventsCompleted.length >= 5) {
			badgesCollected.forEach((data: any) => {
				checkJ = checkJ && data.badge !== 'Junior Steps';
				// console.log('badge === Junior steps', badge, checkJ);
			});
			checkJ &&
				tempBadges.push({
					badge: 'Junior Steps',
					date: date,
				});
		}
		if (eventsCompleted.length >= 10) {
			badgesCollected.forEach((data: any) => {
				checkL = checkL && data.badge !== 'Love Thumb';
				// console.log('badge === Love Thumb', badge, checkL);
			});
			checkL &&
				tempBadges.push({
					badge: 'Love Thumb',
					date: date,
				});
		}

		(checkL || checkJ || checkB) &&
			(await DataService.updateUser(
				{
					badgesCollected: newBadges.concat(tempBadges),
				},
				user.uid
			));
	};

	const getDateAcquired = (badgeName: any) => {
		const date = new Date(
			userBadges.at(
				userBadges.findIndex((data) => {
					return badgeName === data.badge;
				})
			).date
		);

		return date.toDateString();
	};

	return (
		<div className='badges'>
			<div className='badges-list'>
				{badgeDetails.map((data: any, index: number) => {
					return (
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
											{getDateAcquired(data.badgeName)}
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
