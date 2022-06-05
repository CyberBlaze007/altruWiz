import { TextField } from '@mui/material';
import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import DBNav from '../components/navbar/DBNav';
import { auth, storage } from '../firebase-config';
import DataService from '../firebase/services';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

function EventCreation() {
	const navigate = useNavigate();
	const [user, loading] = useAuthState(auth);
	const [eventName, setEventName] = useState('');
	const [eventDesc, setEventDesc] = useState('');
	const [eventCreator, setEventCreator] = useState('');
	const [eventCode, setEventCode] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [eventQuests, setEventQuests] = useState([]);
	const [expReward, setExpReward] = useState([]);
	const [expFinal, setExpFinal] = useState(0);
	const [eventLocation, setEventLocation] = useState('');
	const [eventImage, setEventImage] = useState('');
	// const [addQuest, setAddQuest] = useState(0);
	const [eventsCreated, setEventsCreated] = useState([]);
	const [attendMax, setAttendMax] = useState('');
	const [imageUpload, setImageUpload] = useState(null);

	const imageListRef = ref(storage, `eventImages/${user.uid}/${eventCode}`);
	const uploadImage = () => {
		if (imageUpload == null) return;
		console.log('processing and uploading image');
		const imageRef = ref(storage, `eventImages/${user.uid}/${eventCode}/image`);
		uploadBytes(imageRef, imageUpload).then(() =>
			console.log('successfully uploaded image to storage')
		);
	};

	useEffect(() => {
		getCurrentUser();
		listAll(imageListRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					setEventImage(url);
					console.log('Image Url: ');
					console.log(eventImage);
					makeEvent();
				});
			});
		});
	}, [loading, eventImage]);

	const getCurrentUser = async () => {
		await DataService.getOrg(user.uid).then((docSnap) => {
			// console.log(user.uid);
			if (docSnap.exists()) {
				// console.log('Document data:', docSnap.data());
				const myData = docSnap.data();
				setEventCreator(myData.orgName);
				setEventsCreated(myData.eventsCreated);
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		});
		//getOrg events created
	};

	const loadFile = (event: any) => {
		//process file chosen by user
		var image = document.getElementById('change-image') as HTMLImageElement;
		image.src = URL.createObjectURL(event.target.files[0]);
		setImageUpload(event.target.files[0]);
		console.log('Success');
	};

	function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>): void {
		setEventDesc(event.target.value);
		console.log(eventDesc);
	}

	const processQuest = (index: number, val: any) => {
		//process quests in a single array
		let quests = eventQuests;
		quests[index] = val;
		console.log(quests);
		setEventQuests(quests);
	};
	const processExp = (index: number, val: any) => {
		//process exps from quests in a single array
		let exps = expReward;
		exps[index] = val;
		setExpReward(exps);
		console.log(expReward);
	};
	const calcExp = () => {
		//finalize exp total reward for event
		let exp: number = 0;
		expReward.forEach((element) => {
			exp += parseInt(element);
		});
		setExpFinal(exp);
		console.log(expFinal);
	};

	const makeEvent = async () => {
		//add event to firebase
		const newEvent = {
			attendCount: 0,
			eventName: eventName,
			eventCode: eventCode,
			eventCreator: eventCreator,
			eventDate: eventDate,
			eventImage: eventImage,
			eventDesc: eventDesc,
			expReward: expFinal,
			membersAllowed: parseInt(attendMax),
			quests: eventQuests,
		};

		try {
			await DataService.addEvent(newEvent, eventCode).then(async () => {
				const newEvents = eventsCreated;
				newEvents.push(eventName);
				setEventsCreated(newEvents);
				const updatedOrg = {
					eventsCreated: eventsCreated,
				};
				await DataService.updateOrg(updatedOrg, user.uid);
			});
		} catch (error) {
			console.log(error);
		}

		//empty the states
		setEventName('');
		setEventDesc('');
		setEventCreator('');
		setEventCode('');
		setEventDate('');
		setEventQuests([]);
		setExpReward([]);
		setExpFinal(0);
		setEventLocation('');
		setEventImage('');
		// setAddQuest(0);
		setEventsCreated([]);
		setAttendMax('');
		setImageUpload(null);
		//navigate back to organizer page
		navigate('/organizer');
	};
	return (
		<>
			<div>
				<DBNav />
				<div>
					<h1>Make an Event</h1>
					<p>Let’s cover some basic information about your event.</p>
				</div>
				<div>
					<div>
						<div>
							{/* <img src='' alt='Name Icon' /> */}
							<h2>Name of the Event</h2>
							<input
								value={eventName}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									setEventName(event.target.value);
									console.log(eventName);
								}}
							></input>

							{/* <img src='' alt='Time Icon' /> */}
							<h2>Time {`&`} Date</h2>
							<input
								className='profile-body-sec1-form-bday-field'
								type='datetime-local'
								onChange={(event) => {
									setEventDate(event.target.value);
									console.log(eventDate);
								}}
							/>
						</div>

						{/* <img src='' alt='Image Icon' /> */}
						<h2>Event Image</h2>

						<img src={imageUpload} alt='' id='change-image' />
						<input
							type='file'
							accept='image/*'
							name='image'
							id='file'
							onChange={loadFile}
							// style={{ display: 'none' }}
						/>
					</div>

					{/* <img src='' alt='Location Icon' /> */}
					<h2>Location</h2>
					<input
						type={'search'}
						value={eventLocation}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setEventLocation(event.target.value);
							console.log(eventLocation);
						}}
					></input>

					{/* <img src='' alt='Quest Icon' /> */}
					<div>
						<h2>Quest</h2>
						<input
							type='text'
							placeholder='Assign a quest'
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								processQuest(0, event.target.value);
							}}
						/>
						<input
							type='text'
							placeholder='Assign exp reward'
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								processExp(0, event.target.value);
								calcExp();
							}}
						/>
						<button
							onClick={() => {
								// onclick should display additional fields
								//limit quests to maximum of 5 fields
								// setAddQuest(addQuest + 1);
								// console.log(addQuest);
							}}
						>
							Add another quest
						</button>
						<input
							type='text'
							placeholder='Assign a quest'
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								processQuest(1, event.target.value);
							}}
						/>
						<input
							type='text'
							placeholder='Assign exp reward'
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								processExp(1, event.target.value);
								calcExp();
							}}
						/>
						<input
							type='text'
							placeholder='Assign a quest'
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								processQuest(2, event.target.value);
							}}
						/>
						<input
							type='text'
							placeholder='Assign exp reward'
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								processExp(2, event.target.value);
								calcExp();
							}}
						/>
						<input
							type='text'
							placeholder='Assign a quest'
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								processQuest(3, event.target.value);
							}}
						/>
						<input
							type='text'
							placeholder='Assign exp reward'
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								processExp(3, event.target.value);
								calcExp();
							}}
						/>
						<input
							type='text'
							placeholder='Assign a quest'
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								processQuest(4, event.target.value);
							}}
						/>
						<input
							type='text'
							placeholder='Assign exp reward'
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								processExp(4, event.target.value);
								calcExp();
							}}
						/>
					</div>
					<h2>Max Attendees</h2>
					<input
						type={'text'}
						value={attendMax}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setAttendMax(event.target.value);
							console.log(attendMax);
						}}
					></input>
					<h2>Event Code</h2>
					<input
						type={'text'}
						value={eventCode}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setEventCode(event.target.value);
							console.log(eventCode);
						}}
					></input>
					{/* <img src='' alt='Desc Icon' /> */}
					<h2>Description</h2>
					<textarea
						className='beOrganizer-body-container-info-about-col2-descbox-in'
						rows={4}
						cols={50}
						value={eventDesc}
						onChange={(event) => handleOnChange(event)}
					/>
				</div>
				<button
					onClick={() => {
						uploadImage();
					}}
				>
					Done
				</button>
			</div>
		</>
	);
}

export default EventCreation;
