import React from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Footer from './../footer/Footer';

function Profile() {
	return (
		<div className='profile'>
			<div className='profile-body'>
				<div className='profile-body-sec1'>
					<div className='profile-body-sec1-title'>
						<h1>My Information</h1>
					</div>
					<div className='profile-body-sec1-form'>
						<div className='profile-body-sec1-form-col1'>
							<h1 className='profile-body-sec1-form-col1-label'>First Name</h1>
							<h1 className='profile-body-sec1-form-col1-label'>Last Name</h1>
							<h1 className='profile-body-sec1-form-col1-label'>Gender</h1>
							<h1 className='profile-body-sec1-form-col1-label'>Birthday</h1>
							<h1 className='profile-body-sec1-form-col1-label'>Email</h1>
							<h1 className='profile-body-sec1-form-col1-label'>Address</h1>
						</div>
						<div className='profile-body-sec1-form-col2'>
							<div className='profile-body-sec1-form-col2-fname'>
								<input
									type='text'
									className='profile-body-sec1-form-col2-fname-field'></input>
							</div>
							<div className='profile-body-sec1-form-col2-lname'>
								<input
									type='text'
									className='profile-body-sec1-form-col2-lname-field'></input>
							</div>
							<div className='profile-body-sec1-form-col2-gender'>
								<input
									type='text'
									className='profile-body-sec1-form-col2-gender-field'></input>
							</div>
							<div className='profile-body-sec1-form-col2-bday'>
								<input
									type='text'
									className='profile-body-sec1-form-col2-bday-mfield'></input>
								<input
									type='text'
									className='profile-body-sec1-form-col2-bday-dfield'></input>
								<input
									type='text'
									className='profile-body-sec1-form-col2-bday-yfield'></input>
							</div>
							<div className='profile-body-sec1-form-col2-email'>
								<input
									type='text'
									className='profile-body-sec1-form-col2-email-field'></input>
							</div>
							<div className='profile-body-sec1-form-col2-address'>
								<input
									type='text'
									className='profile-body-sec1-form-col2-address-field'></input>
							</div>
						</div>
					</div>
					<div className='profile-body-sec1-footer'>
						<button className='profile-body-sec1-footer-button'>Edit</button>
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
						<textarea
							rows={4}
							cols={50}
							className='profile-body-sec2-form-field'></textarea>
						<button className='profile-body-sec2-form-button'>
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
