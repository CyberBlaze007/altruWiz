import React, { ChangeEvent, useEffect, useId, useState } from 'react';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
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
	const [eventTime, setEventTime] = useState('');
	const [eventsCreated, setEventsCreated] = useState([]);
	const [attendMax, setAttendMax] = useState('');
	const [imageUpload, setImageUpload] = useState(null);
	const eventID = useId();

	useEffect(() => {
		getCurrentUser();
	}, [loading]);

	const getCurrentUser = async () => {
		await DataService.getOrg(user.uid).then((docSnap) => {
			if (docSnap.exists()) {
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

	const uploadImage = (id: any) => {
		if (imageUpload == null) return;
		console.log('processing and uploading image');
		const imageRef = ref(storage, `eventImages/${user.uid}/${id}/image`);
		const imageListRef = ref(storage, `eventImages/${user.uid}/${id}`);
		uploadBytes(imageRef, imageUpload)
			.then(() => console.log('successfully uploaded image to storage'))
			.finally(() => {
				let downloadedUrl = '';

				listAll(imageListRef).then(async (response) => {
					response.items.forEach((item) => {
						getDownloadURL(item).then(async (url) => {
							downloadedUrl = url;
							console.log('Image Url: ');
							console.log(url);
							try {
								await DataService.updateEvent(
									{ eventImage: downloadedUrl, eventCode: id },
									id
								).then(() => navigate('/organizer'));
							} catch (error) {
								console.log(error);
							}
						});
					});
				});
			});
	};

	function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>): void {
		setEventDesc(event.target.value);
		// console.log(eventDesc);
	}

	const processQuest = (index: number, val: any) => {
		//process quests in a single array
		let quests = eventQuests;
		quests[index] = val;
		setEventQuests(quests);
		console.log(eventQuests);
	};
	const processExp = (index: number, val: any) => {
		//process exps from quests in a single array
		let exps = expReward;
		exps[index] = val;
		setExpReward(exps);
		console.log(expReward);
	};

	const removeEvent = (index: number) => {
		console.log(index);
		setEventQuests([
			...eventQuests.slice(0, index),
			...eventQuests.slice(index + 1),
		]);
		setExpReward([...expReward.slice(0, index), ...expReward.slice(index + 1)]);
	};
	const calcExp = () => {
		//finalize exp total reward for event
		let exp: number = 0;
		expReward.forEach((element) => {
			exp += parseInt(element);
		});
		setExpFinal(exp);
		// console.log(expFinal);
	};

	const makeEvent = async () => {
		//add event to firebase
		const newEvent = {
			attendCount: 0,
			eventName: eventName,
			eventCode: eventCode,
			eventID: eventID,
			eventCreator: eventCreator,
			eventDate: eventDate,
			eventTime: eventTime,
			eventImage: eventImage,
			eventDesc: eventDesc,
			expReward: expFinal,
			location: eventLocation,
			membersAllowed: parseInt(attendMax),
			quests: eventQuests,
		};

		try {
			await DataService.addEvent(newEvent).then(async (doc: any) => {
				let id = doc.id;
				const newEvents = eventsCreated;
				newEvents.push(eventName);
				setEventsCreated(newEvents);
				const updatedOrg = {
					eventsCreated: eventsCreated,
				};
				await DataService.updateOrg(updatedOrg, user.uid).then(() =>
					uploadImage(id)
				);
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
		setEventTime('');
		// setAddQuest(0);
		setEventsCreated([]);
		setAttendMax('');
		setImageUpload(null);
		//navigate back to organizer page
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
							<div className='create-form-section1-col1-entry1-title'>
								<PermContactCalendarOutlinedIcon className='create-form-section1-col2-entry1-title-icon' />
								<h1>Name of Event</h1>
							</div>
							<div className='create-form-section1-col1-entry1-fields'>
								<input
									type='text'
									value={eventName}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setEventName(event.target.value);
									}}
								/>
							</div>
						</div>
						<div className='create-form-section1-col1-entry2'>
							<div className='create-form-section1-col1-entry2-title'>
								<EventOutlinedIcon className='create-form-section1-col2-entry2-title-icon' />
								<h1>Time {'&'} Date</h1>
							</div>
							<div className='create-form-section1-col1-entry2-fields'>
								<input
									type='date'
									className='create-form-section1-col1-entry2-fields-input1'
									onChange={(event) => {
										setEventDate(event.target.value);
									}}
								/>
								<input
									type='time'
									className='create-form-section1-col1-entry2-fields-input2'
									onChange={(event) => {
										setEventTime(event.target.value);
									}}
								/>
							</div>
						</div>
						<div className='create-form-section1-col1-entry3'>
							<div className='create-form-section1-col1-entry3-title'>
								<LocationCityOutlinedIcon className='create-form-section1-col2-entry3-title-icon' />
								<h1>Location</h1>
							</div>
							<div className='create-form-section1-col1-entry3-fields'>
								<input
									type='search'
									value={eventLocation}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setEventLocation(event.target.value);
									}}
								/>
							</div>
						</div>
						<div className='create-form-section1-col1-entry4'>
							<div className='create-form-section1-col1-entry4-title'>
								<GolfCourseOutlinedIcon className='create-form-section1-col1-entry4-title-icon' />
								<h1>Quest</h1>
							</div>
							<div className='create-form-section1-col1-entry4-fields'>
								{eventQuests.map((value, index) => {
									return (
										<>
											<input
												type='text'
												placeholder='Assign a quest'
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) => {
													processQuest(index, event.target.value);
												}}
											/>
											<input
												type='text'
												placeholder='Assign exp reward'
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) => {
													processExp(index, event.target.value);
													calcExp();
												}}
											/>
											<button onClick={() => removeEvent(index)}>
												Remove Quest
											</button>
										</>
									);
								})}
								<button
									onClick={() => {
										setEventQuests(() => [...eventQuests, '']);
										setExpReward(() => [...expReward, '']);
									}}
								>
									Add Another Quest
								</button>

								{/* <input
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
								/> */}
							</div>
						</div>
					</div>
					<div className='create-form-section1-col2'>
						<div className='create-form-section1-col2-entry'>
							<div className='create-form-section1-col2-entry-title'>
								<InsertPhotoOutlinedIcon className='create-form-section1-col2-entry-title-icon' />
								<h1>Event Image</h1>
							</div>
							<div className='create-form-section1-col2-entry-fields'>
								<label
									htmlFor='file'
									className='create-form-section1-col2-entry-fields-input'
								>
									<div className='create-form-section1-col2-entry-fields-input-container'>
										<img
											src=''
											className='create-form-section1-col2-entry-fields-input-container'
											id='change-image'
											alt=''
										/>
										<AddPhotoAlternateOutlinedIcon className='create-form-section1-col2-entry-fields-input-container-image' />
									</div>
								</label>
								<input
									type='file'
									accept='image/*'
									name='image'
									id='file'
									onChange={loadFile}
									style={{ display: 'none' }}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='create-form-section2'>
					<div className='create-form-section2-title'>
						<TextFieldsOutlinedIcon className='create-form-section2-title-icon' />
						<h1>Description</h1>
					</div>
					<div className='create-form-section2-field'>
						<div className='create-form-section2-field-text'>
							<p>
								Write your event’s description and convince people to join your
								cause. Add more details to your event like your sponsors,
								purpose, guests, and schedule.
							</p>
						</div>
						<div className='create-form-section2-field-input'>
							<textarea
								className='create-form-section2-field-input-area'
								value={eventDesc}
								onChange={(event) => handleOnChange(event)}
							/>
						</div>
						<div className='create-form-section1-col1-entry4-fields'>
							<h2>Max Attendees</h2>
							<input
								type={'text'}
								value={attendMax}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									setAttendMax(event.target.value);
								}}
							></input>
						</div>
					</div>
				</div>
				<div className='create-form-section3'>
					<button
						className='create-form-section3-button'
						onClick={() => {
							makeEvent();
						}}
					>
						Done
					</button>
				</div>
			</div>
			<div className='create-footer'>
				<Footer />
			</div>
		</div>
	);
}

export default Create;
