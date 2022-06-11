import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';

import { Button, TextField } from '@mui/material';

function ResetPass() {
	const [email, setEmail] = useState('');
	const auth = getAuth();
	const resetPass = async () => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				alert('Password reset email sent!');
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
	};

	return (
		<div>
			<h1>Enter your email address</h1>
			<TextField
				variant={'standard'}
				color='secondary'
				size='small'
				className='profile-body-sec2-form-field'
				value={email}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setEmail(event.target.value);
					console.log(email);
				}}
				fullWidth
			/>
			<Button onClick={resetPass}>Reset Password</Button>
		</div>
	);
}

export default ResetPass;
