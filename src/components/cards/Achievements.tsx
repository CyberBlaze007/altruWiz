import React, { useEffect, useState, useContext } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { firestore } from '../../firebase-config';
import DataService from '../../firebase/services';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { UserContext } from '../../App';
import ScrollTop from '../navigations/scrollTop';
import RankUp from '../modals/RankUp';

function Achievements() {
	const [rankPic, setRankPic] = useState('');
	const user = useContext(UserContext);
	const [rank, setRank] = useState('');
	const [userRank, setUserRank] = useState('');
	const [myEvents, setMyEvents] = useState([]);
	const [eventDetails, setEventDetails] = useState([]);
	const [myBadges, setMyBadges] = useState([]);
	const [expReq, setExpReq] = useState(0);
	const [expCurrent, setExpCurrent] = useState(0);
	const [isMaxed, setIsMaxed] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);
	const [eventList, setEventList] = useState([]);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		onSnapshot(collection(firestore, 'events'), (snapshot) => {
			setEventList(snapshot.docs.map((docEach) => docEach.data()));
		});
		user &&
			onSnapshot(query(collection(firestore, 'user'), where('email', '==', user.email)), (snapshot) => {
				setUserRank(snapshot.docs.at(0).data().rank);
				setExpCurrent(snapshot.docs.at(0).data().expTotal);
				setMyEvents(snapshot.docs.at(0).data().eventsJoined);
				setMyBadges(snapshot.docs.at(0).data().badgesCollected);
				getTableDetails(snapshot.docs.at(0).data().eventsJoined);
				getRankDetails(snapshot.docs.at(0).data());
			});
	}, [isUpdated]);

	const getTableDetails = async (joinedEvents: any) => {
		let eventArr = eventDetails;
		eventArr = eventList.filter((event) => {
			let isJoined = false;
			joinedEvents.forEach((data: any) => {
				isJoined = isJoined || data === event.eventCode;
			});
			return isJoined;
		});
		setEventDetails(eventArr);
		setIsUpdated(true);
	};

	const getRankDetails = async (data: any) => {
		let expNeed = expReq;
		await DataService.getRank(data.rank).then(async (docSnap: any) => {
			if (docSnap.exists()) {
				setRankPic(docSnap.data().rankPic);
				setExpReq(docSnap.data().expNeeded);
				expNeed = docSnap.data().expNeeded;
				checkUpdateRank(data.expTotal, expNeed, data.rank);
			} else {
				console.log('No such document!');
			}
		});
	};

	//Check update rank still needs to be fixed
	const checkUpdateRank = async (expCurr: any, expNeeded: any, rankCurr: any) => {
		let newRank = rankCurr;
		if (expCurr >= 1000000) {
			setIsMaxed(true);
			newRank = 'Proxima Singula';
		} else if (expCurr >= expNeeded) {
			switch (expNeeded) {
				case 1000: {
					newRank = 'Growing Ember';
					break;
				}
				case 5000: {
					newRank = 'Waking Essence';
					break;
				}
				case 10000: {
					newRank = 'Kindled Soul';
					break;
				}
				case 20000: {
					newRank = 'Manifested Spirit';
					break;
				}
				case 50000: {
					newRank = 'Profound Mind';
					break;
				}
				case 100000: {
					newRank = 'Zealot Body';
					break;
				}
				case 250000: {
					newRank = 'Altruist Sage';
					break;
				}
				case 500000: {
					newRank = 'Proxima Singula';
					break;
				}
				default:
					newRank = rankCurr;
			}
			setShowModal(true);
		}
		await DataService.updateUser(
			{
				rank: newRank,
			},
			user.uid,
		)
			.then(() => setRank(newRank))
			.finally(() => setShowModal(true));
	};

	const processDate = (data: any) => {
		const date = new Date(data.eventDate);

		return date.toDateString();
	};

	return (
		<ScrollTop>
			<RankUp showModal={showModal} setShowModal={setShowModal} rank={rank || userRank} />
			<div className='achievements'>
				<div id='locator' />
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
									className='achievements-body-row1-col2-bar-icon'>
									{isMaxed ? (
										<h1 className='achievements-body-row1-col2-bar-icon-label1'>Maxed</h1>
									) : (
										<>
											<h1 className='achievements-body-row1-col2-bar-icon-label1'>{expCurrent}</h1>
											<h1 className='achievements-body-row1-col2-bar-icon-label2'>{`of ${expReq}`}</h1>
										</>
									)}
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
								<h1 className='achievements-body-row1-col3-section1-text'>EVENTS JOINED</h1>
							</div>
							<div className='achievements-body-row1-col3-section2'>
								<h1 className='achievements-body-row1-col3-section2-number'>
									{myBadges.length < 10 ? '0' : ''}
									{myBadges.length}
								</h1>
								<h1 className='achievements-body-row1-col3-section2-text'>BADGES OBTAINED</h1>
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
								<div className='achievements-body-row2-table-head-col2'>Title</div>
								<div className='achievements-body-row2-table-head-col3'>EXP</div>
								<div className='achievements-body-row2-table-head-col4'>Date</div>
							</div>
							<div className='achievements-body-row2-table-body'>
								{eventDetails.map((data: any, index: number) => {
									return data ? (
										<div className='achievements-body-row2-table-body-cells' key={index}>
											<div className='achievements-body-row2-table-body-cells-col1'>{index + 1}</div>
											<div className='achievements-body-row2-table-body-cells-col2'>{data.eventName}</div>
											<div className='achievements-body-row2-table-body-cells-col3'>{data.expReward}</div>
											<div className='achievements-body-row2-table-body-cells-col4'>{processDate(data)}</div>
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
		</ScrollTop>
	);
}

export default Achievements;
