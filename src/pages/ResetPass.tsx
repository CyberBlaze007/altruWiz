import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { TextField } from '@mui/material';
import LandingNav from '../components/navbar/LandingNav';
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function ResetPass() {
	const [email, setEmail] = useState('');
	const auth = getAuth();
	const navigate = useNavigate();
	const user = useContext(UserContext);

	const resetPass = async () => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				alert('Password reset email sent!');
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
	};

	useEffect(() => {
		if (user) {
			navigate('/dashboard');
		}
	}, [user]);

	return (
		<>
			<LandingNav />
			<div className='resetpass'>
				<div className='resetpass-container'>
					<div className='resetpass-container-row'>
						<ChevronLeftIcon
							className='resetpass-container-row-back'
							onClick={() => navigate('/login')}
						/>
						<h2>Forgot Password</h2>
					</div>
					<img src='/assets/resetPass.svg' alt='' />
					<p>Please enter your email address to receive a verification code.</p>

					<TextField
						variant={'outlined'}
						color='secondary'
						size='small'
						className='profile-body-sec2-form-field'
						value={email}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setEmail(event.target.value);
						}}
						fullWidth
					/>
					<button className='resetPass-container-send' onClick={resetPass}>
						Send
					</button>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default ResetPass;
