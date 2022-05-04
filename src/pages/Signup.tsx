import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import AuthNav from '../components/navbar/AuthNav';
import { useState } from 'react';

//Firebase Components
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

function Signup() {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');

	const register = async () => {
		try {
			await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			).then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				// ...
			});
		} catch (error: any) {
			console.log(error.message);
		}
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
										<input
											className='signup-body-container-section-forms-fullname-col1-input-field'
											type='text'></input>
									</div>
								</div>
								<div className='signup-body-container-section-forms-fullname-col2'>
									<div className='signup-body-container-section-forms-fullname-col2-label'>
										<h1 className='signup-body-container-section-forms-fullname-col2-label-text'>
											Last Name
										</h1>
									</div>
									<div className='signup-body-container-section-forms-fullname-col2-input'>
										<input
											className='signup-body-container-section-forms-fullname-col2-input-field'
											type='text'></input>
									</div>
								</div>
							</div>
							<div className='signup-body-container-section-forms-email'>
								<h1 className='signup-body-container-section-forms-email-text'>
									Email
								</h1>
								<input
									className='signup-body-container-section-forms-email-input'
									type='text'
									onChange={(event) =>
										setRegisterEmail(event.target.value)
									}></input>
							</div>
							<div className='signup-body-container-section-forms-password'>
								<div className='signup-body-container-section-forms-password-col1'>
									<div className='signup-body-container-section-forms-password-col1-label'>
										<h1 className='signup-body-container-section-forms-password-col1-label-text'>
											Password
										</h1>
									</div>
									<div className='signup-body-container-section-forms-password-col1-input'>
										<input
											className='signup-body-container-section-forms-password-col1-input-field'
											type='pass'
											onChange={(event) =>
												setRegisterPassword(event.target.value)
											}></input>
									</div>
								</div>

								<div className='signup-body-container-section-forms-password-col2'>
									<div className='signup-body-container-section-forms-password-col2-label'>
										<h1 className='signup-body-container-section-forms-password-col2-label-text'>
											Confirm Password
										</h1>
									</div>
									<div className='signup-body-container-section-forms-password-col2-input'>
										<input
											className='signup-body-container-section-forms-password-col1-input-field'
											type='pass'></input>
									</div>
								</div>
							</div>
						</div>
						<div className='signup-body-container-section-button'>
							<div className='signup-body-container-section-button-hold'>
								<button
									className='signup-body-container-section-button-hold-create'
									onClick={register}>
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
