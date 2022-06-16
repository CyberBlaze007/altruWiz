import React, { ChangeEvent, useEffect, useState } from 'react';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import GolfCourseOutlinedIcon from '@mui/icons-material/GolfCourseOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import DataService from '../../firebase/services';
import { auth, storage } from '../../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

function Edit({ showModal, setShowModal }: any) {
	const [image, setImage] = useState(null);
	const [user, loading] = useAuthState(auth);
	const [eventName, setEventName] = useState('');
	const [eventDesc, setEventDesc] = useState('');
	const [eventCreator, setEventCreator] = useState('');
	const [eventCode, setEventCode] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [eventQuests, setEventQuests] = useState([]);
	const [expReward, setExpReward] = useState(0);
	const [eventLocation, setEventLocation] = useState('');
	const [eventImage, setEventImage] = useState('');
	const [eventTime, setEventTime] = useState('');
	const [eventsCreated, setEventsCreated] = useState([]);
	const [attendMax, setAttendMax] = useState('');
	const [imageUpload, setImageUpload] = useState(null);
	const eventID = uuidv4();

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
		setImage(URL.createObjectURL(event.target.files[0]));
		setImageUpload(event.target.files[0]);
		// console.log('Success');
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
							// console.log('Image Url: ');
							// console.log(url);
							try {
								await DataService.updateEvent(
									{ eventImage: downloadedUrl, eventCode: id },
									id
								).then(() => setShowModal(false));
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

	const removeEvent = (index: number) => {
		// console.log(index);
		setEventQuests([
			...eventQuests.slice(0, index),
			...eventQuests.slice(index + 1),
		]);
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
			expReward: expReward,
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
		setEventLocation('');
		setEventImage('');
		setEventTime('');
		setEventsCreated([]);
		setAttendMax('');
		setImageUpload(null);
		//navigate back to organizer page
	};

	return (
		<motion.div
			initial={{ scale: 0, opacity: 0 }}
			animate={showModal ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
			transition={{
				scale: showModal ? { duration: 0.1 } : { delay: 0.5, duration: 0.1 },
				default: showModal
					? { delay: 0.1, duration: 0.5, type: 'tween' }
					: { duration: 0.5, type: 'tween' },
			}}
			className='create'>
			<motion.div
				initial={{
					y: '100%',
					scale: 0,
				}}
				animate={
					showModal
						? { y: 0, x: 0, scale: 1 }
						: {
								y: '100%',
								scale: 0,
						  }
				}
				transition={{ delay: 0.1, duration: 0.5, type: 'tween' }}
				className='create-form'>
				<div className='create-form-header'>
					<div className='create-form-header-texts'>
						<h1>Edit Event</h1>
						<h2>Update the information of your event.</h2>
					</div>
					<div className='create-form-header-close'>
						<CloseIcon
							className='create-form-header-close-icon'
							onClick={() => setShowModal(false)}
						/>
					</div>
				</div>
				<div className='create-form-section1'>
					<div className='create-form-section1-col1'>
						<div className='create-form-section1-col1-entry'>
							<div className='create-form-section1-col1-entry-title'>
								<PermContactCalendarOutlinedIcon className='create-form-section1-col1-entry-title-icon' />
								<h1>Name of Event</h1>
							</div>
							<div className='create-form-section1-col1-entry-fields'>
								<input
									type='text'
									className='create-form-section1-col1-entry-fields-input'
									value={eventName}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setEventName(event.target.value);
									}}
								/>
							</div>
						</div>
						<div className='create-form-section1-col1-entry2'>
							<div className='create-form-section1-col1-entry2-title'>
								<EventOutlinedIcon className='create-form-section1-col1-entry2-title-icon' />
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
						<div className='create-form-section1-col1-entry'>
							<div className='create-form-section1-col1-entry-title'>
								<LocationCityOutlinedIcon className='create-form-section1-col1-entry-title-icon' />
								<h1>Location</h1>
							</div>
							<div className='create-form-section1-col1-entry-fields'>
								<input
									type='text'
									className='create-form-section1-col1-entry-fields-input'
									value={eventLocation}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setEventLocation(event.target.value);
									}}
								/>
							</div>
						</div>
						<div className='create-form-section1-col1-entry'>
							<div className='create-form-section1-col1-entry-title'>
								<GolfCourseOutlinedIcon className='create-form-section1-col1-entry-title-icon' />
								<h1>Quest</h1>
							</div>
							<div className='create-form-section1-col1-entry-fields'>
								{eventQuests.map((value, index) => {
									return (
										<div className='create-form-section1-col1-entry-fields-quests'>
											<div className='create-form-section1-col1-entry-fields-quests-inputs'>
												<input
													type='text'
													className='create-form-section1-col1-entry-fields-quests-inputs-field'
													placeholder='Assign a quest'
													onChange={(
														event: React.ChangeEvent<HTMLInputElement>
													) => {
														processQuest(index, event.target.value);
													}}
												/>
											</div>
											<CloseIcon
												className='create-form-section1-col1-entry-fields-quests-button'
												onClick={() => removeEvent(index)}
											/>
										</div>
									);
								})}
								{eventQuests.length > 0 && (
									<input
										type='number'
										className='create-form-section1-col1-entry-fields-quests-inputs-field'
										placeholder='Assign exp reward'
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
											setExpReward(event.target.valueAsNumber);
										}}
									/>
								)}
								<button
									className='create-form-section1-col1-entry-fields-button'
									onClick={() => {
										setEventQuests(() => [...eventQuests, '']);
									}}>
									Add a Quest
								</button>
							</div>
						</div>
						<div className='create-form-section1-col1-entry'>
							<div className='create-form-section1-col1-entry-title'>
								<NaturePeopleIcon className='create-form-section1-col1-entry-title-icon' />
								<h1>Max Attendees</h1>
							</div>
							<div className='create-form-section1-col1-entry-fields'>
								<input
									type={'text'}
									className='create-form-section1-col1-entry-fields-input'
									value={attendMax}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setAttendMax(event.target.value);
									}}
								/>
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
									className='create-form-section1-col2-entry-fields-input'>
									<div className='create-form-section1-col2-entry-fields-input-container'>
										{image ? (
											<>
												<img
													src={image}
													alt=''
													className='create-form-section1-col2-entry-fields-input-container-image'
												/>
												<CloseIcon
													className='create-form-section1-col2-entry-fields-input-container-button'
													onClick={() => {
														setImage(null);
														setImageUpload(null);
													}}
												/>
											</>
										) : (
											<AddPhotoAlternateOutlinedIcon className='create-form-section1-col2-entry-fields-input-container-image' />
										)}
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
					</div>
				</div>
				<div className='create-form-section3'>
					<button
						className='create-form-section3-button'
						onClick={() => {
							makeEvent();
						}}>
						Done
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default Edit;
