import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import AuthNav from '../components/navbar/AuthNav';
import { TextField } from '@mui/material';

//Firebase Components
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import DataService from '../firebase/services';
import { useAuthState } from 'react-firebase-hooks/auth';

function Signup() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate('/dashboard/profile');
	}, [user, loading]);

	const register = async () => {
		//sign up back-end
		const newUser = {
			name: { first: firstName, last: lastName },
			rank: 'Spark',
			avatar: '',
			eventsJoined: [''],
			badgesCollected: [''],
			expTotal: 0,
		};

		//create user for Authentication
		try {
			await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			).then(async (userCredential) => {
				// User Created for Auth
				const userID = userCredential.user.uid;
				console.log(userID);

				//create userData for Firestore
				try {
					await DataService.addUser(newUser, userID);
				} catch (error) {
					console.log(error);
				}
			});
		} catch (error: any) {
			console.log(error.message);
		}

		setFirstName('');
		setLastName('');
		setRegisterEmail('');
		setRegisterPassword('');
		setConfirmPassword('');
	};

	return (
		<div className='signup'>
			<div className='signup-navbar'>
				<AuthNav />
			</div>
			<div className='signup-body'>
				<div className='signup-body-container'>
					<div className='signup-body-container-header'>
						<h1 className='signup-body-container-header-text1'>Sign Up</h1>
						<h1 className='signup-body-container-header-text2'>
							Register with your valid email address.
						</h1>
					</div>
					<div className='signup-body-container-section'>
						<div className='signup-body-container-section-forms'>
							<div className='signup-body-container-section-forms-fullname'>
								<div className='signup-body-container-section-forms-fullname-col1'>
									<div className='signup-body-container-section-forms-fullname-col1-label'>
										<h1 className='signup-body-container-section-forms-fullname-col1-label-text'>
											First Name
										</h1>
									</div>
									<div className='signup-body-container-section-forms-fullname-col1-input'>
										<TextField
											variant='outlined'
											color='secondary'
											size='small'
											className='signup-body-container-section-forms-fullname-col1-input-field'
											margin='dense'
											value={firstName}
											onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
												setFirstName(event.target.value)
											}
											fullWidth
										/>
									</div>
								</div>
								<div className='signup-body-container-section-forms-fullname-col2'>
									<div className='signup-body-container-section-forms-fullname-col2-label'>
										<h1 className='signup-body-container-section-forms-fullname-col2-label-text'>
											Last Name
										</h1>
									</div>
									<div className='signup-body-container-section-forms-fullname-col2-input'>
										<TextField
											variant='outlined'
											color='secondary'
											size='small'
											className='signup-body-container-section-forms-fullname-col2-input-field'
											margin='dense'
											value={lastName}
											onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
												setLastName(event.target.value)
											}
											fullWidth
										/>
									</div>
								</div>
							</div>
							<div className='signup-body-container-section-forms-email'>
								<h1 className='signup-body-container-section-forms-email-text'>
									Email
								</h1>
								<TextField
									variant='outlined'
									color='secondary'
									size='small'
									className='signup-body-container-section-forms-email-field'
									margin='dense'
									value={registerEmail}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
										setRegisterEmail(event.target.value)
									}
									fullWidth
								/>
							</div>
							<div className='signup-body-container-section-forms-password'>
								<div className='signup-body-container-section-forms-password-col1'>
									<div className='signup-body-container-section-forms-password-col1-label'>
										<h1 className='signup-body-container-section-forms-password-col1-label-text'>
											Password
										</h1>
									</div>
									<div className='signup-body-container-section-forms-password-col1-input'>
										<TextField
											variant='outlined'
											color='secondary'
											size='small'
											className='signup-body-container-section-forms-password-col1-input-field'
											margin='dense'
											type='password'
											value={registerPassword}
											onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
												setRegisterPassword(event.target.value)
											}
											fullWidth
										/>
									</div>
								</div>

								<div className='signup-body-container-section-forms-password-col2'>
									<div className='signup-body-container-section-forms-password-col2-label'>
										<h1 className='signup-body-container-section-forms-password-col2-label-text'>
											Confirm Password
										</h1>
									</div>
									<div className='signup-body-container-section-forms-password-col2-input'>
										<TextField
											variant='outlined'
											color='secondary'
											size='small'
											className='signup-body-container-section-forms-password-col2-input-field'
											margin='dense'
											type='password'
											value={confirmPassword}
											onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
												setConfirmPassword(event.target.value)
											}
											fullWidth
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='signup-body-container-section-button'>
							<div className='signup-body-container-section-button-hold'>
								<button
									className='signup-body-container-section-button-hold-create'
									onClick={
										confirmPassword === registerPassword
											? register
											: () => alert('Password does not match')
									}>
									Create Account
								</button>
							</div>
						</div>
						<div className='signup-body-container-section-footer'>
							<div className='signup-body-container-section-footer-hold'>
								<div className='signup-body-container-section-footer-hold-label'>
									<h1 className='signup-body-container-section-footer-hold-label-text'>
										Already have an account?
									</h1>
								</div>
								<div className='signup-body-container-section-footer-hold-login'>
									<Link
										className='signup-body-container-section-footer-hold-login-link'
										to={'/login'}>
										Login
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default Signup;
