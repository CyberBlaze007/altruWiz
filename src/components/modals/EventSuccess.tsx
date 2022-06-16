import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import RedeemIcon from '@mui/icons-material/Redeem';

function EventSuccess() {
	return (
		<div className='create-eventsuccess'>
			<div className='create-eventsuccess-container'>
				<div className='create-eventsuccess-container-row1'>
					<CloseIcon className='create-eventsuccess-container-row1-icon' />
				</div>
				<div className='create-eventsuccess-container-row2'>
					<img
						src='../../../../assets/gift.png'
						className='create-eventsuccess-container-row2-icon'
					/>
					<h1 className='create-eventsuccess-container-row2-text1'>
						You have successfully completed an event.
					</h1>
					<h2 className='create-eventsuccess-container-row2-text2'>
						You can view your certificate{' '}
						<a href='' className=''>
							here
						</a>
						.
					</h2>
					<button className='create-eventsuccess-container-row2-button'>
						More Events
					</button>
				</div>
			</div>
		</div>
	);
}

export default EventSuccess;
