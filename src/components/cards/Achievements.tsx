import React, { useEffect, useState } from 'react';
import { achievements } from '../../../assets/pseudodata/achievements';
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase-config';
import DataService from '../../firebase/services';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

function Achievements() {
	const [rankPic, setRankPic] = useState('');
	const [user, loading] = useAuthState(auth);
	const [userRank, setUserRank] = useState('');
	const [myEvents, setMyEvents] = useState([]);
	const [eventDetails, setEventDetails] = useState([]);
	const [myBadges, setMyBadges] = useState([]);
	const [expReq, setExpReq] = useState(0);
	const [expCurrent, setExpCurrent] = useState(0);
	const [joinedEvents, setJoinedEvents] = useState([]);

	useEffect(() => {
		onSnapshot(
			query(collection(firestore, 'user'), where('email', '==', user.email)),
			(snapshot) => {
				setUserRank(snapshot.docs.at(0).data().rank);
				setExpCurrent(snapshot.docs.at(0).data().expTotal);
				setMyEvents(snapshot.docs.at(0).data().eventsJoined);
				setMyBadges(snapshot.docs.at(0).data().badgesCollected);
				setJoinedEvents(snapshot.docs.at(0).data().eventsJoined);
				getRankDetails();
			}
		);
		let eventArr: any = [];
		joinedEvents.forEach((data) => {
			onSnapshot(
				query(collection(firestore, 'events'), where('eventCode', '==', data)),
				(snapshot) => {
					snapshot.docs.map((docEach) => eventArr.push(docEach.data()));
				}
			);
		});
		setEventDetails(eventArr);
	}, [loading, userRank]);

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

	const processDate = (data: any) => {
		const date = new Date(data.eventDate);
		// const date = new Date(data.eventDate + 'T' + data.eventTime);
		// const time = new Date(
		// 	data.eventDate + 'T' + data.eventTime
		// ).toLocaleTimeString('en-US', {
		// 	hour12: true,
		// 	hour: 'numeric',
		// 	minute: 'numeric',
		// });
		return date.toDateString();
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
							<div className='achievements-body-row2-table-head-col4'>Date</div>
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
											{processDate(data)}
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
