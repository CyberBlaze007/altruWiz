import { TextField } from '@mui/material';
import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import DBNav from '../components/navbar/DBNav';
import { auth, storage } from '../firebase-config';
import DataService from '../firebase/Services';
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
	const [eventLocation, setEventLocation] = useState('');
	const [eventImage, setEventImage] = useState('');
	// const [expReward, setExpReward] = useState('');
	const [eventsCreated, setEventsCreated] = useState([]);
	const [attendMax, setAttendMax] = useState('');
	const [imageUpload, setImageUpload] = useState(null);
	// const [imageUrl, setImageUrl] = useState('');

	const imageListRef = ref(storage, `eventImages/${user.uid}/`);
	const uploadImage = () => {
		if (imageUpload == null) return;
		const imageRef = ref(storage, `eventImages/${user.uid}/image`);
		uploadBytes(imageRef, imageUpload);
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
	}, [loading]);

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
		var image = document.getElementById('change-image') as HTMLImageElement;
		image.src = URL.createObjectURL(event.target.files[0]);
		setImageUpload(event.target.files[0]);
		console.log('Success');
	};

	function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>): void {
		setEventDesc(event.target.value);
		console.log(eventDesc);
	}

	const makeEvent = async () => {
		const newEvent = {
			attendCount: 0,
			eventName: eventName,
			eventCode: eventCode,
			eventCreator: eventCreator,
			eventDate: eventDate,
			eventImage: eventImage,
			eventDesc: eventDesc,
			// expReward: expReward,
			membersAllowed: attendMax,
			quests: eventQuests,
		};

		try {
			await DataService.addEvent(newEvent, user.uid).then(async () => {
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

		setEventName('');
		setEventDesc('');
		setEventCreator('');
		setEventCode('');
		setEventDate('');
		setEventImage('');
		// setExpReward('');
		setAttendMax('');
		setEventQuests([]);

		navigate('/organization');
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
							{/* <TextField
								variant={'outlined'}
								color='secondary'
								size='small'
								className='profile-body-sec1-form-bday-field'
								type={'date'}
								margin='dense'
								value={eventDate}
								// disabled={editState}
								onChange={(event) => setEventDate(event.target.value)}
							/> */}
						</div>

						{/* <img src='' alt='Image Icon' /> */}
						<h2>Event Image</h2>
						{/* <input
							type='file'
							onChange={(event) => {
								setEventImage(event.target.value);
								console.log(eventImage);
							}}
						/> */}
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
					<h2>Quest</h2>
					<input
						type='text'
						placeholder='Add a field'
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setEventQuests([event.target.value]);
							console.log(eventQuests);
						}}
					/>

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
						uploadImage;
					}}
				>
					Done
				</button>
			</div>
		</>
	);
}

export default EventCreation;
