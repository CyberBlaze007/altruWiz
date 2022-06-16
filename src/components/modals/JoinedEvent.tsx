import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

function JoinedEvent() {
	return (
		<div className='joined'>
			<div className='joined-container'>
				<div className='joined-container-row1'>
					<CloseIcon className='joined-container-row1-icon' />
				</div>
				<div className='joined-container-row2'>
					<img
						src='/assets/user-check.png'
						className='joined-container-row2-icon'
					/>
					<h1>You have successfully joined an event.</h1>
					<button className='joined-container-row2-button'>More Events</button>
				</div>
			</div>
		</div>
	);
}

export default JoinedEvent;
