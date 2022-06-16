import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import RedeemIcon from '@mui/icons-material/Redeem';
import { useNavigate } from 'react-router-dom';

function EventSuccess() {
	const navigate = useNavigate();
	return (
		<div className='create-eventsuccess'>
			<div className='create-eventsuccess-container'>
				<div className='create-eventsuccess-container-row1'>
					<CloseIcon className='create-eventsuccess-container-row1-icon' />
				</div>
				<div className='create-eventsuccess-container-row2'>
					<img src='../../../../assets/gift.png' className='create-eventsuccess-container-row2-icon' />
					<h1 className='create-eventsuccess-container-row2-text1'>You have successfully completed an event.</h1>
					<h2 className='create-eventsuccess-container-row2-text2'>See your dashboard for your certificates!</h2>
					<button onClick={() => navigate('/events')} className='create-eventsuccess-container-row2-button'>
						More Events
					</button>
				</div>
			</div>
		</div>
	);
}

export default EventSuccess;
