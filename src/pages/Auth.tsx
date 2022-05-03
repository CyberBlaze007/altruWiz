import { useState } from 'react';
import '../main.scss';

//Firebase Components
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { auth } from '../firebase-config';

function Auth({ type = true }) {
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
				}
			);
		} catch (error: any) {
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

	return <div className='auth'></div>;
}

export default Auth;
