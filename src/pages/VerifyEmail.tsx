import { getAuth, sendEmailVerification } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LandingNav from '../components/navbar/LandingNav';
import Footer from '../components/footer/Footer';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../App';
import Loading from '../components/navigations/Loading';

function VerifyEmail() {
	const [loading, setLoading] = useState(true);
	const auth = getAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const user = auth.currentUser;

	const verify = async () => {
		sendEmailVerification(auth.currentUser)
			.then(() => {
				alert('Your new verification link was sent! Please check your email.');
				user && auth.signOut();
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
	};

	useEffect(() => {
		user && user.emailVerified
			? navigate('/dashboard')
			: location.pathname !== '/verify' && navigate('/verify');
	}, [user]);

	setTimeout(() => setLoading(false), 1000);

	return loading ? (
		<Loading />
	) : (
		<>
			<LandingNav />
			<div className='resetpass'>
				<div className='resetpass-container'>
					<div className='resetpass-container-row'>
						<ChevronLeftIcon
							className='resetpass-container-row-back'
							onClick={() => navigate('/login')}
						/>
						<h2>Email has been sent</h2>
					</div>
					<img src='/assets/emailSent.svg' alt='' />
					<p>
						Please click on the link that was sent to your email address to
						continue.
						<br />
						<br />
						Once done verifying, refresh the page. <br />
						<br />
						Thank you!
					</p>
					<button className='resetPass-container-send' onClick={verify}>
						Resend Verification Link
					</button>
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
									to={'/login'}
								>
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default VerifyEmail;
