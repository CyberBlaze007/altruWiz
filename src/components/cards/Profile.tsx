import React, { useContext, useEffect, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import DataService from '../../firebase/services';
import { UserContext } from '../../App';
import ScrollTop from './../navigations/scrollTop';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { motion } from 'framer-motion';
import { storage } from '../../firebase-config';

function Profile() {
	const [image, setImage] = useState(null);
	const [imageUpload, setImageUpload] = useState(null);
	const [data, setData] = useState(null);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [description, setDescription] = useState('');
	const [bday, setBday] = useState('');
	const [editState, setEditState] = useState(true);
	const user = useContext(UserContext);

	useEffect(() => {
		user && getCurrentUser();
	}, []);
	const getCurrentUser = async () => {
		await DataService.getUser(user.uid).then((docSnap) => {
			if (docSnap.exists()) {
				// console.log('Document data:', docSnap.data());
				const myData = docSnap.data();
				setFirstName(myData.name.first);
				setLastName(myData.name.last);
				setGender(myData.gender);
				setEmail(myData.email);
				setAddress(myData.address);
				setDescription(myData.desc);
				setBday(myData.bday);
				setImage(myData.profilePic);
				setData(myData);
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		});
	};

	const loadFile = (event: any) => {
		//process file chosen by user
		setImage(URL.createObjectURL(event.target.files[0]));
		setImageUpload(event.target.files[0]);
		// console.log('Success');
	};

	const uploadImage = () => {
		if (imageUpload == null) return;
		console.log('processing and uploading image');
		const imageRef = ref(storage, `userAvatars/${user.uid}/image`);
		const imageListRef = ref(storage, `userAvatars/${user.uid}`);
		uploadBytes(imageRef, imageUpload)
			.then(() => console.log('successfully uploaded profilePic to storage'))
			.finally(() => {
				let downloadedUrl = '';
				listAll(imageListRef).then(async (response) => {
					response.items.forEach((item) => {
						getDownloadURL(item).then(async (url) => {
							downloadedUrl = url;
							try {
								await DataService.updateUser(
									{ profilePic: downloadedUrl },
									user.uid
								);
							} catch (error) {
								console.log(error);
							}
						});
					});
				});
			});
	};

	const update = async () => {
		const updatedUser = {
			name: { first: firstName, last: lastName },
			gender: gender,
			email: email,
			address: address,
			desc: description,
			bday: bday,
		};
		try {
			await DataService.updateUser(updatedUser, user.uid).then(() =>
				uploadImage()
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancel = () => {
		setFirstName(data.name.first);
		setLastName(data.name.last);
		setGender(data.gender);
		setEmail(data.email);
		setAddress(data.address);
		setDescription(data.desc);
		setBday(data.bday);
		setImage(data.profilePic);
	};
	return (
		<ScrollTop>
			<div className='profile'>
				<div id='locator' />
				<div className='profile-body'>
					<div className='profile-body-sec1'>
						<div className='profile-body-sec1-container'>
							{image ? (
								<img
									src={image}
									alt=''
									className='profile-body-sec1-container-image'
								/>
							) : (
								<img
									src='/assets/noPic.svg'
									alt=''
									className='profile-body-sec1-container-image'
								/>
							)}
							{!editState && (
								<>
									<label
										htmlFor='profilePic'
										className='profile-body-sec1-container-label'
									>
										<AddAPhotoOutlinedIcon className='profile-body-sec1-container-label-icon' />
									</label>
									<input
										type='file'
										accept='image/*'
										name='image'
										id='profilePic'
										onChange={loadFile}
										style={{ display: 'none' }}
									/>
								</>
							)}
						</div>
						<div className='profile-body-sec1-title'>
							<h1>About You</h1>
						</div>
						<div className='profile-body-sec1-form'>
							{description || !editState ? null : (
								<img
									className='profile-body-sec1-form-img'
									src='/assets/lazy.svg'
								/>
							)}
							{editState ? (
								<p className='profile-body-sec1-form-data'>
									{description ||
										'This person is either too lazy or has not yet added some details.'}
								</p>
							) : null}
							{!editState ? (
								<TextField
									variant={editState ? 'standard' : 'outlined'}
									color='secondary'
									placeholder='Write something about you...'
									size='small'
									multiline
									rows={5}
									className='profile-body-sec1-form-field'
									value={description}
									disabled={editState}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
										setDescription(event.target.value)
									}
									fullWidth
								/>
							) : null}
						</div>
					</div>
					<div className='profile-body-sec2'>
						<div className='profile-body-sec2-title'>
							<h1>My Information</h1>
						</div>
						<div className='profile-body-sec2-form'>
							<div className='profile-body-sec2-form-fname'>
								<h1 className='profile-body-sec2-form-label'>First Name</h1>
								{editState ? (
									<h1 className='profile-body-sec2-form-data'>{firstName}</h1>
								) : null}
								{!editState ? (
									<TextField
										variant={editState ? 'standard' : 'outlined'}
										color='secondary'
										size='small'
										className='profile-body-sec2-form-fname-field'
										margin='dense'
										value={firstName}
										disabled={editState}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											setFirstName(event.target.value)
										}
										fullWidth
									/>
								) : null}
							</div>
							<div className='profile-body-sec2-form-lname'>
								<h1 className='profile-body-sec2-form-label'>Last Name</h1>
								{editState ? (
									<h1 className='profile-body-sec2-form-data'>{lastName}</h1>
								) : null}
								{!editState ? (
									<TextField
										variant={editState ? 'standard' : 'outlined'}
										color='secondary'
										size='small'
										className='profile-body-sec2-form-lname-field'
										margin='dense'
										value={lastName}
										disabled={editState}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											setLastName(event.target.value)
										}
										fullWidth
									/>
								) : null}
							</div>
							<div className='profile-body-sec2-form-gender'>
								<h1 className='profile-body-sec2-form-label'>Gender</h1>
								{editState ? (
									<h1 className='profile-body-sec2-form-data'>{gender}</h1>
								) : null}
								{!editState ? (
									<TextField
										variant={editState ? 'standard' : 'outlined'}
										color='secondary'
										sx={{ minWidth: '8rem' }}
										size='small'
										className='profile-body-sec2-form-gender-field'
										margin='dense'
										value={gender}
										disabled={editState}
										select={!editState}
										onChange={(event) => setGender(event.target.value)}
									>
										<MenuItem value={'Male'}>Male</MenuItem>
										<MenuItem value={'Female'}>Female</MenuItem>
										<MenuItem value={'Prefer not to say'}>
											Prefer not to say
										</MenuItem>
									</TextField>
								) : null}
							</div>
							<div className='profile-body-sec2-form-bday'>
								<h1 className='profile-body-sec2-form-label'>Birthday</h1>
								{editState ? (
									<h1 className='profile-body-sec2-form-data'>{bday}</h1>
								) : null}
								{!editState ? (
									<TextField
										variant={editState ? 'standard' : 'outlined'}
										color='secondary'
										size='small'
										className='profile-body-sec2-form-bday-field'
										type={editState ? 'text' : 'date'}
										margin='dense'
										value={bday}
										disabled={editState}
										onChange={(event) => setBday(event.target.value)}
									/>
								) : null}
							</div>
							<div className='profile-body-sec2-form-email'>
								<h1 className='profile-body-sec2-form-label'>Email</h1>
								{editState ? (
									<h1 className='profile-body-sec2-form-data'>{email}</h1>
								) : null}
								{!editState ? (
									<TextField
										variant={editState ? 'standard' : 'outlined'}
										color='secondary'
										size='small'
										className='profile-body-sec2-form-email-field'
										margin='dense'
										value={email}
										disabled={editState}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											setEmail(event.target.value)
										}
										fullWidth
									/>
								) : null}
							</div>
							<div className='profile-body-sec2-form-address'>
								<h1 className='profile-body-sec2-form-label'>Address</h1>
								{editState ? (
									<h1 className='profile-body-sec2-form-data'>{address}</h1>
								) : null}
								{!editState ? (
									<TextField
										variant={editState ? 'standard' : 'outlined'}
										color='secondary'
										size='small'
										className='profile-body-sec2-form-address-field'
										margin='dense'
										value={address}
										disabled={editState}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											setAddress(event.target.value)
										}
										fullWidth
									/>
								) : null}
							</div>
						</div>

						<div className='profile-body-sec2-footer'>
							{editState ? (
								<motion.button
									whileHover={{ y: '-3px' }}
									whileTap={{ y: '3px' }}
									className='profile-body-sec2-footer-button'
									onClick={() => setEditState(false)}
								>
									Edit
								</motion.button>
							) : (
								<div className='profile-body-sec2-footer-buttons'>
									<motion.button
										whileHover={{ y: '-3px' }}
										whileTap={{ y: '3px' }}
										className='profile-body-sec2-footer-buttons-comp1'
										onClick={() => {
											setEditState(true);
											update();
										}}
									>
										Save Changes
									</motion.button>
									<motion.button
										whileHover={{ y: '-3px' }}
										whileTap={{ y: '3px' }}
										className='profile-body-sec2-footer-buttons-comp2'
										onClick={() => {
											setEditState(true);
											handleCancel();
										}}
									>
										Cancel Changes
									</motion.button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</ScrollTop>
	);
}

export default Profile;
