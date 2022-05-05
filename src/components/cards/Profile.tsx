import React, { useState } from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Footer from './../footer/Footer';
import { TextField, MenuItem } from '@mui/material';

function Profile() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [description, setDescription] = useState('');
	const [bday, setBday] = useState('');
	const [editState, setEditState] = useState(true);

	return (
		<div className='profile'>
			<div className='profile-body'>
				<div className='profile-body-sec1'>
					<div className='profile-body-sec1-title'>
						<h1>My Information</h1>
					</div>
					<div className='profile-body-sec1-form'>
						<div className='profile-body-sec1-form-fname'>
							<h1 className='profile-body-sec1-form-label'>First Name</h1>
							<TextField
								variant={editState ? 'standard' : 'outlined'}
								color='secondary'
								size='small'
								className='profile-body-sec1-form-fname-field'
								margin='dense'
								value={firstName}
								disabled={editState}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setFirstName(event.target.value)
								}
								fullWidth
							/>
						</div>
						<div className='profile-body-sec1-form-lname'>
							<h1 className='profile-body-sec1-form-label'>Last Name</h1>
							<TextField
								variant={editState ? 'standard' : 'outlined'}
								color='secondary'
								size='small'
								className='profile-body-sec1-form-lname-field'
								margin='dense'
								value={lastName}
								disabled={editState}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setLastName(event.target.value)
								}
								fullWidth
							/>
						</div>
						<div className='profile-body-sec1-form-gender'>
							<h1 className='profile-body-sec1-form-label'>Gender</h1>
							<TextField
								variant={editState ? 'standard' : 'outlined'}
								color='secondary'
								sx={{ minWidth: '8rem' }}
								size='small'
								className='profile-body-sec1-form-gender-field'
								margin='dense'
								value={gender}
								disabled={editState}
								select
								onChange={(event) => setGender(event.target.value)}>
								<MenuItem value={'Male'}>Male</MenuItem>
								<MenuItem value={'Female'}>Female</MenuItem>
								<MenuItem value={'Prefer not to say'}>
									Prefer not to say
								</MenuItem>
							</TextField>
						</div>
						<div className='profile-body-sec1-form-bday'>
							<h1 className='profile-body-sec1-form-label'>Birthday</h1>
							<TextField
								variant={editState ? 'standard' : 'outlined'}
								color='secondary'
								size='small'
								className='profile-body-sec1-form-bday-field'
								type='date'
								margin='dense'
								value={bday}
								disabled={editState}
								onChange={(event) => setBday(event.target.value)}
							/>
						</div>
						<div className='profile-body-sec1-form-email'>
							<h1 className='profile-body-sec1-form-label'>Email</h1>
							<TextField
								variant={editState ? 'standard' : 'outlined'}
								color='secondary'
								size='small'
								className='profile-body-sec1-form-email-field'
								margin='dense'
								value={email}
								disabled={editState}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setEmail(event.target.value)
								}
								fullWidth
							/>
						</div>
						<div className='profile-body-sec1-form-address'>
							<h1 className='profile-body-sec1-form-label'>Address</h1>
							<TextField
								variant={editState ? 'standard' : 'outlined'}
								color='secondary'
								size='small'
								className='profile-body-sec1-form-address-field'
								margin='dense'
								value={address}
								disabled={editState}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setAddress(event.target.value)
								}
								fullWidth
							/>
						</div>
					</div>
					<div className='profile-body-sec1-footer'>
						<button
							className='profile-body-sec1-footer-button'
							onClick={() => setEditState(false)}>
							Edit
						</button>
					</div>
				</div>
				<div className='profile-body-divider'>
					<AddBoxOutlinedIcon />
				</div>
				<div className='profile-body-sec2'>
					<div className='profile-body-sec2-title'>
						<h1>About You</h1>
					</div>
					<div className='profile-body-sec2-form'>
						<TextField
							variant={editState ? 'standard' : 'outlined'}
							color='secondary'
							placeholder='Write something about you...'
							size='small'
							multiline
							rows={5}
							className='profile-body-sec2-form-field'
							value={description}
							disabled={editState}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setDescription(event.target.value)
							}
							fullWidth
						/>
						<button
							className='profile-body-sec2-form-button'
							onClick={() => setEditState(true)}>
							Save Changes
						</button>
					</div>
				</div>
			</div>
			<div className='profile-footer'>
				<Footer />
			</div>
		</div>
	);
}

export default Profile;
