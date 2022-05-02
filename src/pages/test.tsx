import React, { useContext, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';
import '../main.scss';
import { auth } from '../firebase-config';

// const AuthContext = React.createContext();

// export function useAuth() {
// 	return useContext(AuthContext);
// }

function Test() {
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
					const user = userCredential.user;
					console.log(user);
					var temp: any = '';
					temp = userCredential.user.email;
					setUser(temp);
					// ...
				}
			);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const logout = async () => {
		await signOut(auth);
	};

	return (
		<div className='App'>
			<div>
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

				<button onClick={register}> Create User</button>
			</div>

			<div>
				<h3> Login </h3>
				<input
					placeholder='Email...'
					onChange={(event) => {
						setLoginEmail(event.target.value);
					}}
				/>
				<input
					placeholder='Password...'
					onChange={(event) => {
						setLoginPassword(event.target.value);
					}}
				/>

				<button onClick={login}> Login</button>
			</div>

			<h4> User Logged In: </h4>
			<h2>{user}</h2>
			<button onClick={logout}> Sign Out </button>
		</div>
	);
}

export default Test;
