import React, { useContext, useState } from 'react';
import '../main.scss';

//Firebase Components
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import AuthNav from '../components/AuthNav';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

// const AuthContext = React.createContext();
// export function useAuth() {
// 	return useContext(AuthContext);
// }

function Auth({ type = true }) {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const [user, setUser] = useState('');

	onAuthStateChanged(auth, (user: any) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			const uid = user.uid;
			console.log(uid);
			// ...
		} else {
			// User is signed out
			// ...
		}
	});

	const register = async () => {
		try {
			await createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then((userCredential) => {
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
			await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				var temp: any = '';
				temp = userCredential.user.email;
				setUser(temp);
				// ...
			});
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const logout = async () => {
		await signOut(auth);
	};

	return (
		<div className='auth'>
			<div className='auth-nav'>
				<AuthNav />
			</div>
			<div className='auth-body'>
				{type ? (
					<div className='auth-body-login'>
						<div className='auth-body-login-col1'>
							<img src='/assets/sign-in-backdrop.png' />
						</div>
						<div className='auth-body-login-col2'>
							<div className='auth-body-login-col2-header'>
								<h1>Login</h1>
								<h1>Welcome! Please login to your account.</h1>
							</div>
							<div className='auth-body-login-col2-fields'>
								<div className='auth-body-login-col2-fields-input'>
									<h1>Email Address</h1>
									<input
										onChange={(event) => {
											setLoginEmail(event.target.value);
										}}></input>
									<h1>Password</h1>
									<input
										onChange={(event) => {
											setLoginPassword(event.target.value);
										}}></input>
									<h1>Forgot Password</h1>
								</div>
								<button onClick={login}>Login</button>
							</div>
							<div className='auth-body-login-col2-footer'>
								<Link to={'/register'}>New User? Sign Up</Link>
							</div>
						</div>
					</div>
				) : (
					<div className='auth-body-signup'>
						<h3> Register User </h3>
						<input
							placeholder='Email...'
							onChange={(event) => {
								setRegisterEmail(event.target.value);
							}}
						/>
						<input
							placeholder='Password...'
							onChange={(event) => {
								setRegisterPassword(event.target.value);
							}}
						/>

						<button onClick={register}>Create Account </button>
					</div>
				)}
			</div>
			<div className='auth-footer'>
				<Footer />
			</div>

			{/* <h4> User Logged In: </h4>
			<h2>{user}</h2>
			<button onClick={logout}> Sign Out </button> */}
		</div>
	);
}

export default Auth;
