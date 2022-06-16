import React, { useContext, useEffect, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import DataService from '../../firebase/services';
import { UserContext } from '../../App';

function Profile() {
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
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
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
			await DataService.updateUser(updatedUser, user.uid);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='profile'>
			<div className='profile-body'>
				<div className='profile-body-sec1'>
					<div className='profile-body-sec1-title'>
						<h1>About You</h1>
					</div>
					<div className='profile-body-sec1-form'>
						{description ? null : <img className='profile-body-sec1-form-img' src='/assets/lazy.png' />}
						{editState ? (
							<p className='profile-body-sec1-form-data'>{description || 'This person is either too lazy or has not yet added some details.'}</p>
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
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
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
							{editState ? <h1 className='profile-body-sec2-form-data'>{firstName}</h1> : null}
							{!editState ? (
								<TextField
									variant={editState ? 'standard' : 'outlined'}
									color='secondary'
									size='small'
									className='profile-body-sec2-form-fname-field'
									margin='dense'
									value={firstName}
									disabled={editState}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
									fullWidth
								/>
							) : null}
						</div>
						<div className='profile-body-sec2-form-lname'>
							<h1 className='profile-body-sec2-form-label'>Last Name</h1>
							{editState ? <h1 className='profile-body-sec2-form-data'>{lastName}</h1> : null}
							{!editState ? (
								<TextField
									variant={editState ? 'standard' : 'outlined'}
									color='secondary'
									size='small'
									className='profile-body-sec2-form-lname-field'
									margin='dense'
									value={lastName}
									disabled={editState}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
									fullWidth
								/>
							) : null}
						</div>
						<div className='profile-body-sec2-form-gender'>
							<h1 className='profile-body-sec2-form-label'>Gender</h1>
							{editState ? <h1 className='profile-body-sec2-form-data'>{gender}</h1> : null}
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
									onChange={(event) => setGender(event.target.value)}>
									<MenuItem value={'Male'}>Male</MenuItem>
									<MenuItem value={'Female'}>Female</MenuItem>
									<MenuItem value={'Prefer not to say'}>Prefer not to say</MenuItem>
								</TextField>
							) : null}
						</div>
						<div className='profile-body-sec2-form-bday'>
							<h1 className='profile-body-sec2-form-label'>Birthday</h1>
							{editState ? <h1 className='profile-body-sec2-form-data'>{bday}</h1> : null}
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
							{editState ? <h1 className='profile-body-sec2-form-data'>{email}</h1> : null}
							{!editState ? (
								<TextField
									variant={editState ? 'standard' : 'outlined'}
									color='secondary'
									size='small'
									className='profile-body-sec2-form-email-field'
									margin='dense'
									value={email}
									disabled={editState}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
									fullWidth
								/>
							) : null}
						</div>
						<div className='profile-body-sec2-form-address'>
							<h1 className='profile-body-sec2-form-label'>Address</h1>
							{editState ? <h1 className='profile-body-sec2-form-data'>{address}</h1> : null}
							{!editState ? (
								<TextField
									variant={editState ? 'standard' : 'outlined'}
									color='secondary'
									size='small'
									className='profile-body-sec2-form-address-field'
									margin='dense'
									value={address}
									disabled={editState}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
									fullWidth
								/>
							) : null}
						</div>
					</div>

					<div className='profile-body-sec2-footer'>
						{editState ? (
							<button className='profile-body-sec2-footer-button' onClick={() => setEditState(false)}>
								Edit
							</button>
						) : (
							<button
								className='profile-body-sec2-footer-button'
								onClick={() => {
									setEditState(true);
									update();
								}}>
								Save Changes
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
