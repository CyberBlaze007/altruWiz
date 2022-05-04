import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import AuthNav from '../components/navbar/AuthNav';

function Signup() {
	return (
		<div className='signup'>
			<div className='signup-navbar'>
				<AuthNav />
			</div>
			<div className='signup-body-container'>
				<div className='signup-body-container-header'>
					<h1 className='signup-body-container-header-text1'>Sign Up</h1>
					<h1 className='signup-body-container-header-text2'>
						Register with your valid email address.
					</h1>
				</div>
				<div className='signup-body-container-fullname'>
					<h1 className='signup-body-container-fullname-text'>First Name</h1>
					<input
						className='signup-body-container-fullname-input'
						type='text'></input>
					<h1 className='signup-body-container-fullname-text'>Last Name</h1>
					<input
						className='signup-body-container-fullname-input'
						type='text'></input>
				</div>
				<div className='signup-body-container-email'>
					<h1 className='signup-body-container-email-text'>Email</h1>
					<input
						className='signup-body-container-email-input'
						type='text'></input>
				</div>
				<div className='signup-body-container-password'>
					<h1 className='signup-body-container-password-text'> Password</h1>
					<input
						className='signup-body-container-password-input'
						type='text'></input>
					<h1 className='signup-body-container-password-text'>
						Confirm Password
					</h1>
					<input
						className='signup-body-container-password-input'
						type='text'></input>
				</div>
				<div className='signup-body-container-button'>
					<button className='signup-body-container-button-create'>
						Create Account
					</button>
				</div>
				<div className='signup-body-container-footer'>
					<h1 className='signup-body-container-footer-text'>
						Already have an account?
					</h1>
					<Link className='signup-body-container-footer-login' to={'/login'}>
						Login
					</Link>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default Signup;
