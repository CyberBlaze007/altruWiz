import { async } from '@firebase/util';
import { ConstructionOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// import badges from '../../../assets/pseudodata/badges';
import { auth } from '../../firebase-config';
import DataService from '../../firebase/Services';
import { debounce } from 'lodash';
// import { realGetBadge } from './../../../assets/pseudodata/badges';
import Loading from './../navigations/Loading';

function Badges(check: any) {
	// const [obtained, setObtained] = useState(false);
	const [badgeList, setBadgeList] = useState([]);
	const [badgeDetails, setBadgeDetails]: any = useState([]);
	const [user, loading] = useAuthState(auth);
	check && (check = user);

	useEffect(() => {
		getBadgeList();
		getBadgeDetails();
	}, [loading]);

	const getBadgeList = async () => {
		await DataService.getUser(check.uid).then(async (docSnap) => {
			if (docSnap.exists()) {
				setBadgeList(docSnap.data().badgesCollected);
				// await getBadgeDetails();
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		});
	};
	const getBadgeDetails = async () => {
		await DataService.getBadges(badgeList).then((result) => {
			setBadgeDetails(result);
			console.log('badgeDetails: ');
			console.log(badgeDetails);
		});
	};

	// if (obtained) {
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
											{data.dateAcquired}
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
	// }
}

export default Badges;
