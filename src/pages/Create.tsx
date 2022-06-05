import React, { ChangeEvent, useEffect, useState } from 'react';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import GolfCourseOutlinedIcon from '@mui/icons-material/GolfCourseOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import DataService from '../firebase/services';
import { auth, storage } from '../firebase-config';

import Footer from '../components/footer/Footer';
import DBNav from '../components/navbar/DBNav';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function Create() {
	const navigate = useNavigate();

	const [user, loading] = useAuthState(auth);
	const [eventsCreated, setEventsCreated] = useState([]);
	const [eventName, setEventName] = useState('');
	const [eventDesc, setEventDesc] = useState('');
	const [eventCreator, setEventCreator] = useState('');
	const [eventCode, setEventCode] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [eventQuests, setEventQuests] = useState([]);
	const [eventLocation, setEventLocation] = useState('');
	const [eventImage, setEventImage] = useState('');
	const [attendMax, setAttendMax] = useState('');
	const [imageUpload, setImageUpload] = useState(null);

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
		<div className='create'>
			<div className='create-navbar'>
				<DBNav />
			</div>
			<div className='create-form'>
				<div className='create-form-header'>
					<h1>Make an Event</h1>
					<h2>Let’s cover some basic information about your event.</h2>
				</div>
				<div className='create-form-section1'>
					<div className='create-form-section1-col1'>
						<div className='create-form-section1-col1-entry1'>
							<div className='create-form-section1-col1-entry-title'>
								<PermContactCalendarOutlinedIcon />
								<h1>Name of Event</h1>
							</div>
							<div className='create-form-section1-col1-entry-fields'>
								<input
									value={eventName}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setEventName(event.target.value);
										console.log(eventName);
									}}
								/>
							</div>
						</div>
						<div className='create-form-section1-col1-entry2'>
							<div className='create-form-section1-col1-entry-title'>
								<EventOutlinedIcon />
								<h1>Time {'&'} Date</h1>
								<input
									className='profile-body-sec1-form-bday-field'
									type='datetime-local'
									onChange={(event) => {
										setEventDate(event.target.value);
										console.log(eventDate);
									}}
								/>
							</div>
							<div className='create-form-section1-col1-entry-fields'></div>
						</div>
						<div className='create-form-section1-col1-entry3'>
							<div className='create-form-section1-col1-entry-title'>
								<LocationCityOutlinedIcon />
								<h1>Location</h1>
							</div>
							<div className='create-form-section1-col1-entry-fields'>
								<input
									type={'search'}
									value={eventLocation}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setEventLocation(event.target.value);
										console.log(eventLocation);
									}}
								/>
							</div>
						</div>
						<div className='create-form-section1-col1-entry4'>
							<div className='create-form-section1-col1-entry-title'>
								<GolfCourseOutlinedIcon />
								<h1>Quest</h1>
							</div>
							<div className='create-form-section1-col1-entry-fields'>
								<input
									type='text'
									placeholder='Add a field'
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setEventQuests([event.target.value]);
										console.log(eventQuests);
									}}
								/>
							</div>
						</div>
					</div>
					<div className='create-form-section1-col2'>
						<div className='create-form-section1-col2-entry'>
							<div className='create-form-section1-col2-entry-title'>
								<TextFieldsOutlinedIcon />
								<h1>Description</h1>
							</div>
							<div className='create-form-section1-col2-entry-fields'>
								<textarea
									className='beOrganizer-body-container-info-about-col2-descbox-in'
									rows={4}
									cols={50}
									value={eventDesc}
									onChange={(event) => handleOnChange(event)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='create-form-section2'>
					<div className='create-form-section2-title'>
						<InsertPhotoOutlinedIcon />
						<h1>Event Image</h1>
						<input
							type='file'
							accept='image/*'
							name='image'
							id='file'
							onChange={loadFile}
							// style={{ display: 'none' }}
						/>
					</div>
					<div className='create-form-section2-field'>
						<div className='create-form-section2-fields-text'>
							<p>
								Write your event’s description and convince people to join your
								cause. Add more details to your event like your sponsors,
								purpose, guests, and schedule.
							</p>
						</div>
						<div className='create-form-section2-fields-input'></div>
					</div>
				</div>
				<div className='create-form-button'>
					<button>Done</button>
				</div>
			</div>
			<div className='create-footer'>
				<Footer />
			</div>
		</div>
	);
}

export default Create;
