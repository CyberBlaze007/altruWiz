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
	const [myBadges, setMyBadges] = useState([]);
	// const [data, setData] = useState('');
	const [myData, setMyData]: any = useState(getBadges(myBadges));
	// const [myBadge, setMyBadges] = useState([]);

	// const myData: any = getBadges(data);

	const getCurrentBadges = debounce(async () => {
		await DataService.getUser(user.uid).then((docSnap) => {
			try {
				const myData = docSnap.data();
				setMyBadges(myData.badgesCollected);
				console.log(myBadges);
			} catch (e) {
				console.log(e);
			}
		});
	}, 100);

	useEffect(() => {
		getCurrentBadges();
		setMyData(getBadges(myBadges));
		return () => {
			getCurrentBadges();
			setMyData(getBadges(myBadges));
		};
	}, [loading]);

	return (
		<div className='badges'>
			<div className='badges-list'>
				<>
					{myBadges.map((index) => {
						return (
							<div key={index} className='badges-list-card'>
								<div className='badges-list-card-overlay'>
									<img src={myData?.at(index).badgePic} />
									<div className='badges-list-card-overlay-details'>
										<h1 className='badges-list-card-overlay-details-name'>
											{myData?.at(index).badgeName}
										</h1>
										<h1 className='badges-list-card-overlay-details-desc'>
											{myData?.at(index).badgeDesc}
										</h1>
										<div className='badges-list-card-overlay-details-date'>
											<h1 className='badges-list-card-overlay-details-date-text1'>
												{myData?.at(index).dateAcquired.toString()}
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
					{/* <h1> */}
					{/* <>{console.log(getBadges(myBadges[1]))}</> */}
					{/* {myBadges[1]} */}
					{/* </h1> */}
				</>
			</div>
		</div>
	);
}

export default Badges;
