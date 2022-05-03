import React, { useState } from 'react';
import AuthNav from './../components/navbar/AuthNav';
import Footer from './../components/footer/Footer';

//For Auth
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { auth } from '../firebase-config';
import { Link } from 'react-router-dom';

function Signin() {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	var [user, setUser] = useState('');

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

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
				(userCredential) => {
					// Signed in
					var temp: any = userCredential.user.email;
					setUser(temp);
					// ...
					alert(`User Logged In: ${temp}`);
				}
			);
		} catch (error: any) {
			alert('User Not Logged In.');
			console.log(error.message);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth).then(() => {
				setUser('');
				console.log('User Signed Out');
				console.log(user);
			});
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<div className='signin'>
			<div className='signin-navbar'>
				<AuthNav />
			</div>
			<div className='signin-body'>
				<div className='signin-body-container'>
					<div className='signin-body-container-col1'>
						<img src='/assets/sign-in-backdrop.png' />
					</div>
					<div className='signin-body-container-col2'>
						<div className='signin-body-container-col2-header'>
							<h1 className='signin-body-container-col2-header-text1'>Login</h1>
							<h1 className='signin-body-container-col2-header-text2'>
								Welcome! Please login to your account.
							</h1>
						</div>
						<div className='signin-body-container-col2-form'>
							<div className='signin-body-container-col2-form-fields'>
								<h1 className='signin-body-container-col2-form-fields-text1'>
									Email Address
								</h1>
								<input
									type='text'
									onChange={(event) => {
										setLoginEmail(event.target.value);
									}}
									className='signin-body-container-col2-form-fields-input'></input>
								<h1 className='signin-body-container-col2-form-fields-text1'>
									Password
								</h1>
								<input
									type='text'
									onChange={(event) => {
										setLoginPassword(event.target.value);
									}}
									className='signin-body-container-col2-form-fields-input'></input>
								<h1 className='signin-body-container-col2-form-fields-text2'>
									Forgot Password
								</h1>
							</div>
							<div className='signin-body-container-col2-form-container'>
								<button
									onClick={login}
									className='signin-body-container-col2-form-container-button'>
									Login
								</button>
							</div>
						</div>
						<div className='signin-body-container-col2-footer'>
							<Link
								to={'/register'}
								className='signin-body-container-col2-footer-text'>
								New User? Sign Up
							</Link>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Signin;
