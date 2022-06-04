import React, { useEffect, useState } from 'react';
import { achievements } from '../../../assets/pseudodata/achievements';
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase-config';
import DataService from '../../firebase/Services';

function Achievements() {
	const [rankPic, setRankPic] = useState('');
	const [user, loading] = useAuthState(auth);
	const [userRank, setUserRank] = useState('');
	const [myEvents, setMyEvents] = useState([]);
	const [eventDetails, setEventDetails] = useState([]);
	const [myBadges, setMyBadges] = useState([]);
	const [expReq, setExpReq] = useState(0);
	const [expCurrent, setExpCurrent] = useState(0);

	useEffect(() => {
		getCurrentUser();
		getRankDetails();
		if (eventDetails.length === 0) getEventDetails();
	}, [loading, userRank, eventDetails]);

	const getCurrentUser = async () => {
		await DataService.getUser(user.uid).then(async (docSnap) => {
			if (docSnap.exists()) {
				setUserRank(docSnap.data().rank);
				setExpCurrent(docSnap.data().expTotal);
				setMyEvents(docSnap.data().eventsJoined);
				setMyBadges(docSnap.data().badgesCollected);
				getRankDetails();
			} else {
				console.log('No such document!');
			}
		});
	};
	const getRankDetails = async () => {
		await DataService.getRank(userRank).then(async (docSnap: any) => {
			if (docSnap.exists()) {
				setRankPic(docSnap.data().rankPic);
				setExpReq(docSnap.data().expNeeded);
			} else {
				console.log('No such document!');
			}
		});
	};
	const getEventDetails = async () => {
		await DataService.getEventList().then((result) => {
			let finalEvents: any = [];
			myEvents.forEach((id: any) => {
				finalEvents.push(result.find((item: any) => item.eventName === id));
			});
			setEventDetails(finalEvents);
		});
	};

	return (
		<div className='achievements'>
			<div className='achievements-body'>
				<div className='achievements-body-row1'>
					<div className='achievements-body-row1-col1'>
						{rankPic !== '' ? (
							<img
								src={rankPic}
								// onError={() => setRank(false)}
								// onLoad={() => setRank(true)}
								className='achievements-body-row1-col1-image'
							/>
						) : (
							<div className='achievements-body-row1-col1-image'></div>
						)}
						<h1 className='achievements-body-row1-col1-text'>{userRank}</h1>
					</div>
					<div className='achievements-body-row1-col2'>
						<div className='achievements-body-row1-col2-bar'>
							<CircularProgressbarWithChildren
								styles={buildStyles({
									pathTransitionDuration: 5,
									pathColor: '#7339AB',
									textColor: '#f88',
									trailColor: 'rgba(117, 57, 172, 0.3)',
									backgroundColor: '#3e98c7',
								})}
								value={(expCurrent * 100) / expReq}
								className='achievements-body-row1-col2-bar-icon'
							>
								<h1 className='achievements-body-row1-col2-bar-icon-label1'>
									{expCurrent}
								</h1>
								<h1 className='achievements-body-row1-col2-bar-icon-label2'>
									{`of ${expReq}`}
								</h1>
							</CircularProgressbarWithChildren>
						</div>
						<h1 className='achievements-body-row1-col2-text'>EXP</h1>
					</div>
					<div className='achievements-body-row1-col3'>
						<div className='achievements-body-row1-col3-section1'>
							<h1 className='achievements-body-row1-col3-section1-number'>
								{myEvents.length < 10 ? '0' : ''}
								{myEvents.length}
							</h1>
							<h1 className='achievements-body-row1-col3-section1-text'>
								EVENTS JOINED
							</h1>
						</div>
						<div className='achievements-body-row1-col3-section2'>
							<h1 className='achievements-body-row1-col3-section2-number'>
								{myBadges.length < 10 ? '0' : ''}
								{myBadges.length}
							</h1>
							<h1 className='achievements-body-row1-col3-section2-text'>
								BADGES OBTAINED
							</h1>
						</div>
					</div>
				</div>
				<div className='achievements-body-row2'>
					<div className='achievements-body-row2-header'>
						<h1 className='achievements-body-row2-header-label'>Your Events</h1>
					</div>
					<div className='achievements-body-row2-table'>
						<div className='achievements-body-row2-table-head'>
							<div className='achievements-body-row2-table-head-col1'>#</div>
							<div className='achievements-body-row2-table-head-col2'>
								Title
							</div>
							<div className='achievements-body-row2-table-head-col3'>EXP</div>
							<div className='achievements-body-row2-table-head-col4'>
								Date Completed
							</div>
						</div>
						<div className='achievements-body-row2-table-body'>
							{eventDetails.map((data: any, index: number) => {
								return data ? (
									<div
										className='achievements-body-row2-table-body-cells'
										key={index}
									>
										<div className='achievements-body-row2-table-body-cells-col1'>
											{index + 1}
										</div>
										<div className='achievements-body-row2-table-body-cells-col2'>
											{data.eventName}
										</div>
										<div className='achievements-body-row2-table-body-cells-col3'>
											{data.expReward}
										</div>
										<div className='achievements-body-row2-table-body-cells-col4'>
											{data.eventDate}
										</div>
									</div>
								) : (
									<h1>No events yet</h1>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Achievements;
