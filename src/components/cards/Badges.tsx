import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase-config';
import DataService from '../../firebase/Services';

function Badges(check: any) {
	const [badgeList, setBadgeList] = useState([]);
	const [badgeDetails, setBadgeDetails]: any = useState([]);
	const [user, loading] = useAuthState(auth);
	check && (check = user);

	useEffect(() => {
		getBadgeList();
		if (badgeDetails.length === 0) getBadgeDetails();
	}, [loading, badgeDetails]);

	const getBadgeList = async () => {
		await DataService.getUser(check.uid).then(async (docSnap) => {
			if (docSnap.exists()) {
				setBadgeList(docSnap.data().badgesCollected);
			} else {
				console.log('No such document!');
			}
		});
	};
	const getBadgeDetails = async () => {
		await DataService.getBadges().then((result) => {
			let finalBadges: any = [];
			badgeList.forEach((id: any) => {
				finalBadges.push(result.find((item: any) => item.id === id));
			});
			setBadgeDetails(finalBadges);
		});
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
