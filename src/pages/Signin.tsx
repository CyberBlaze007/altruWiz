import React, { useContext, useEffect, useState } from 'react';
import AuthNav from './../components/navbar/AuthNav';
import Footer from './../components/footer/Footer';
import { TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

//For Auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { UserContext } from './../App';
import Loading from './../components/navigations/Loading';

function Signin() {
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const user = useContext(UserContext);

	useEffect(() => {
		user && console.log('verified:', user.emailVerified);
		if (user) {
			user.emailVerified ? navigate('/dashboard') : navigate('/verify');
		}
	}, [user]);

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
		} catch (err: any) {
			alert(err.message);
		}
	};

	setTimeout(() => setLoading(false), 1000);

	return loading ? (
		<Loading />
	) : (
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
								<TextField
									variant='outlined'
									color='secondary'
									size='small'
									className='signin-body-container-col2-form-fields-field'
									margin='dense'
									value={loginEmail}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
										setLoginEmail(event.target.value)
									}
									fullWidth
								/>
								<h1 className='signin-body-container-col2-form-fields-text1'>
									Password
								</h1>
								<TextField
									variant='outlined'
									color='secondary'
									size='small'
									type='password'
									className='signin-body-container-col2-form-fields-field'
									margin='dense'
									value={loginPassword}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
										setLoginPassword(event.target.value)
									}
									fullWidth
								/>
								<h1
									className='signin-body-container-col2-form-fields-text2'
									onClick={() => navigate('/resetpassword')}
								>
									Forgot Password
								</h1>
							</div>
							<div className='signin-body-container-col2-form-container'>
								<button
									onClick={login}
									className='signin-body-container-col2-form-container-button'
								>
									Login
								</button>
							</div>
						</div>
						<div className='signin-body-container-col2-footer'>
							<Link
								to={'/register'}
								className='signin-body-container-col2-footer-text'
							>
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
